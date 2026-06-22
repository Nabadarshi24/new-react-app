import express, { Request, Response } from "express";
import { protect } from "../middleware/authMiddleware";
import { Aspect } from "../models/Aspect";

const router = express.Router();

// @route GET /api/payment/method-options
// @desc Get payment method options
// @access Private

router.get("/method-options", protect, async (req: Request, res: Response) => {
  try {
    const options = await Aspect.find({ type: { $in: ["payment_method"] } });

    if (!options || options.length === 0) {
      return res.status(404).json({ message: "Payment method options not found" });
    }

    res.status(200).json({
      data: options,
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

