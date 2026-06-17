import { Request, Response } from "express";
import axios from "axios";
import * as globals from "node-global-storage";
import { randomUUID } from "crypto";
import https from "https";
import { Payment } from "../models/PaymentModel";

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
    console.log(req.body);
    const { amount } = req.body;

    try {
      const response = await axios.post(process.env.BKASH_CREATE_PAYMENT_URL!, {
        mode: "0000",
        payerReference: "PAYER123",
        paymentAddress: "Shewrapara, Dhaka",
        callbackURL: "http://localhost:5000/api/bkash/payment/callback",
        // agreementID: "TokenizedMerchant01L3IKB6H1565072174986",
        amount: amount.toString(),
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "INV" + randomUUID().substring(0, 5),
        // invoice_number: "INV123",
      }, {
        httpsAgent: agent,
        headers: await this.bkash_headers()
        // headers: {
        //   "Content-Type": "application/json",
        //   "Accept": "application/json",
        //   "Authorization": req.body.id_token,
        //   "X-App-Key": process.env.BKASH_API_KEY!
        // },
      });

      res.status(200).json({
        data: {
          bkashURL: response.data.bkashURL
        },
        success: true
      });
    } catch (error: any) {
      console.log(error);
      // console.log("Status:", error.response?.status);
      // console.log("Data:", error.response?.data);
      // console.log("Headers:", error.response?.headers);
      res.status(500).json({ message: error.response?.data?.message || 'Something went wrong' });
    }
  }

  callback = async (req: Request, res: Response) => {
    const { paymentID, status } = req.query

    if (status === 'cancel' || status === 'failure') {
      return res.redirect(`http://localhost:5173/error?message=${status}`)
    }
    if (status === 'success') {
      try {
        const { data } = await axios.post(process.env.BKASH_EXECUTE_PAYMENT_URL!, { paymentID }, {
          headers: await this.bkash_headers()
        })
        if (data && data.statusCode === '0000') {
          const userId = globals.getValue('userId')
          await Payment.create({
            userId,
            paymentID,
            trxID: data.trxID,
            date: data.paymentExecuteTime,
            amount: parseInt(data.amount)
          })

          return res.redirect(`http://localhost:5173/success`)
        } else {
          return res.redirect(`http://localhost:5173/error?message=${data.statusMessage}`)
        }
      } catch (error: any) {
        console.log(error)
        return res.redirect(`http://localhost:5173/error?message=${error.message}`)
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
