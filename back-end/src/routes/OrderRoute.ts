import express, { Request, Response } from "express";
import { protect } from "../middleware/authMiddleware";
import Order from "../models/Order";

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged in user orders
// @access Private

router.get("/my-orders", protect, async (req: Request, res: Response) => {
  try {
    // Find authenticated user orders
    const myOrders = await Order.find({ user: req.body.user._id }).sort({ createdAt: -1 }); //Sort by most recent orders

    res.status(201).json(myOrders);
  } catch (error) {
    console.log("Error getting user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/orders/details/:id
// @desc Get order details by id
// @access Private

router.get("/details/:id", protect, async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return full order details
    res.status(200).json(order);
  } catch (error) {
    console.log("Error getting order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;