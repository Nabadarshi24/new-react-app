import express, { Request, Response } from "express";
import { admin, protect } from "../middleware/authMiddleware";
import Order from "../models/Order";

const router = express.Router();

// @route GET /api/admin/order/all
// @desc Get all orders (Admin only)
// @access Private/Admin
router.get("/all", protect, admin, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @route PUT /api/admin/order/update/:id
// @desc Update order status (Admin only)
// @access Private/Admin
router.put("/update/:id", protect, admin, async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;
    order.isDelivered = req.body.status === "Delivered" ? true : false;
    order.deliveredAt = req.body.status === "Delivered" ? new Date(Date.now()) : order.deliveredAt;

    const updatedOrder = await order.save();

    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @route DELETE /api/admin/order/delete/:id
// @desc Delete an order (Admin only)
// @access Private/Admin
router.delete("/delete/:id", protect, admin, async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;