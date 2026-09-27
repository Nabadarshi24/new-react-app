import express from "express";
import { protect, admin } from "../middleware/authMiddleware";
import { getDashboardStats } from "../controller/AdminController";

const router = express.Router();

// Mount this router at /api/admin in your main server file:
// app.use("/api/admin", adminRoutes);
// Full path: GET /api/admin/dashboard
router.get("/dashboard",
    // protect,
    // admin,
    getDashboardStats
);

export default router;
