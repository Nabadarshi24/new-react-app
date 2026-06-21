import express from "express";
import { bkashAuth } from "../middleware/bkashMiddleware";
import { PaymentController } from "../controller/BkashPaymentController";

const router = express.Router();

const paymentController = new PaymentController();

// @route POST /api/bkash/payment/create
// @desc Create bkash payment
// @access Public
router.post("/payment/create", bkashAuth, paymentController.paymentCreate);

// @route GET /api/bkash/payment/callback
// @desc Handle bkash payment callback
// @access Public
router.get("/payment/callback", bkashAuth, paymentController.callback);

export default router;