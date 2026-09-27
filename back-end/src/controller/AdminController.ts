import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product"; // adjust path to your existing Product model

// @route   GET /api/admin/dashboard
// @desc    Aggregate stats for the admin dashboard cards + recent orders
// @access  Private/Admin
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    debugger;
    const [totalOrders, totalProducts, revenueResult, recentOrders] =
      await Promise.all([
        Order.countDocuments(),
        Product.countDocuments(),
        Order.aggregate([
          // Swap to { isPaid: true } in $match below if you only want
          // paid-order revenue instead of all orders.
          { $group: { _id: null, total: { $sum: "$totalPrice" } } },
        ]),
        Order.find({})
          .populate("user", "name email")
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

    res.json({
      data: {
        revenue: revenueResult[0]?.total ?? 0,
        totalOrders,
        totalProducts,
        recentOrders,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
