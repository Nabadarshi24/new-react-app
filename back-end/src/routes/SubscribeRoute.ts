import express, { Request, Response } from "express";
import Subscriber from "../models/Subscriber";

const router = express.Router();

// @route POST /api/subscribe
// @desc Subscribe to the newsletter
// @access Public
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    // Create new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Successfully subscribed to the newsletter" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;