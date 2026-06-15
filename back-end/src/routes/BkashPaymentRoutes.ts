import express, { Request, Response } from "express";
import axios from "axios";
import globals from "node-global-storage";
import { bkashAuth } from "../middleware/bkashMiddleware";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const id_token = globals.getValue('id_token') as string;

const bkashHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": id_token,
  "X-App-Key": process.env.BKASH_API_KEY!
}

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
      mode: "0011",
      PaymentAddress: " ",
      callback_url: "http://localhost:5000/api/bkash/payment/callback",
      amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: "INV" + uuidv4().substring(0, 5),
      // invoice_number: "INV123",
    }, {
      headers: bkashHeaders,
    });

    res.status(200).json({ bkashURL: response.data.bkashURL });
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ message: error.response?.data?.message || 'Something went wrong' });
  }
});

export default router;