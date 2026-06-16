import express, { Request, Response } from "express";
import axios from "axios";
import * as globals from "node-global-storage";
import { bkashAuth } from "../middleware/bkashMiddleware";
import { randomUUID } from "crypto";
import https from "https";

const router = express.Router();

console.log(globals.getValue("id_token"));

const id_token = globals.getValue('id_token') as string;

const bkashHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": globals.getValue('id_token') as string,
  "X-App-Key": process.env.BKASH_API_KEY!
}

const agent = new https.Agent({
  rejectUnauthorized: false,
});

// const bkash_headers = async () => {
//   return {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     authorization: globals.getValue('id_token'),
//     "x-app-key": process.env.BKASH_API_KEY!
//   }
// }

// @route POST /api/bkash/payment/create
// @desc Create bkash payment
// @access Public
router.post("/payment/create", bkashAuth, async (req: Request, res: Response) => {
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
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": req.body.id_token,
        "X-App-Key": process.env.BKASH_API_KEY!
      },
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
});

export default router;