import { Request, Response } from "express";
import axios from "axios";
import * as globals from "node-global-storage";
import { randomUUID } from "crypto";
import https from "https";
import { Payment } from "../models/PaymentModel";
import Checkout from "../models/Checkout";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export class PaymentController {
  bkash_headers = async () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: globals.getValue('id_token') as string,
      'x-app-key': process.env.BKASH_API_KEY!,
    }
  };

  paymentCreate = async (req: Request, res: Response) => {
    const { checkoutId } = req.body;

    try {
      const checkout = await Checkout.findById(checkoutId);

      if (!checkout) {
        return res.status(404).json({
          message: "Checkout not found"
        });
      }

      if (checkout.isFinalized) {
        return res.status(400).json({
          message: "Checkout already finalized"
        });
      }

      if (checkout.isPaid) {
        return res.status(400).json({
          message: "Checkout is already paid"
        });
      }

      const response = await axios.post(
        process.env.BKASH_CREATE_PAYMENT_URL!,
        {
          // Use the mode appropriate for your
          // bKash merchant/payment flow.
          mode: "0000",

          payerReference: String(checkout.user),

          paymentAddress: "Shewrapara, Dhaka",

          callbackURL:
            "http://localhost:5000/api/bkash/payment/callback",

          amount: checkout.totalPrice.toString(),

          currency: "BDT",

          intent: "sale",

          merchantInvoiceNumber:
            "INV" + randomUUID().substring(0, 5)
        },
        {
          httpsAgent: agent,

          headers: await this.bkash_headers()
        }
      );

      // VERY IMPORTANT:
      // Save bKash payment ID against checkout
      checkout.paymentDetails = {
        paymentID: response.data.paymentID,
        merchantInvoiceNumber:
          response.data.merchantInvoiceNumber
      };

      checkout.paymentStatus = "Pending";

      await checkout.save();

      return res.status(200).json({
        data: {
          bkashURL: response.data.bkashURL
        },

        success: true
      });

    } catch (error: any) {

      console.log(
        error.response?.data || error
      );

      return res.status(500).json({
        message:
          error.response?.data?.message ||
          "Something went wrong"
      });
    }
  };

  callback = async (req: Request, res: Response) => {
    const { paymentID, status } = req.query;
    console.log("Callback:", { paymentID, status })

    if (status === 'cancel' || status === 'failure') {
      return res.redirect(`http://localhost:5173/bkash/error?message=${status}`)
    }
    if (status === 'success') {
      try {
        const { data } = await axios.post(process.env.BKASH_EXECUTE_PAYMENT_URL!, { paymentID }, {
          headers: await this.bkash_headers()
        })

        if (data && data.statusCode === '0000') {
          const userId = globals.getValue('userId')
          await Payment.create({
            userId: Math.random() * 10 + 1,
            paymentID,
            trxID: data.trxID,
            date: data.paymentExecuteTime,
            amount: parseInt(data.amount)
          })

          return res.redirect(`http://localhost:5173/bkash/success`)
        } else {
          return res.redirect(`http://localhost:5173/bkash/error?message=${data.statusMessage}`)
        }
      } catch (error: any) {
        console.log(error)
        return res.redirect(`http://localhost:5173/bkash/error?message=${error.message}`)
      }
    }
  };

  // refund = async (req, res) => {
  //   const { trxID } = req.params;

  //   try {
  //     const payment = await paymentModel.findOne({ trxID })

  //     const { data } = await axios.post(process.env.bkash_refund_transaction_url, {
  //       paymentID: payment.paymentID,
  //       amount: payment.amount,
  //       trxID,
  //       sku: 'payment',
  //       reason: 'cashback'
  //     }, {
  //       headers: await this.bkash_headers()
  //     })
  //     if (data && data.statusCode === '0000') {
  //       return res.status(200).json({ message: 'refund success' })
  //     } else {
  //       return res.status(404).json({ error: 'refund failed' })
  //     }
  //   } catch (error) {
  //     return res.status(404).json({ error: 'refund failed' })
  //   }
  // }
}
