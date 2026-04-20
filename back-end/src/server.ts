import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
// import connectDB from "./config/db";
import userRoutes from "./routes/UserRoutes";
import productRoutes from "./routes/ProductRoutes";
import cartRoutes from "./routes/CartRoute";
import checkoutRoutes from "./routes/CheckoutRoutes";
import orderRoutes from "./routes/OrderRoute";
import uploadRoutes from "./routes/UploadRoutes";
import subscribeRoutes from "./routes/SubscribeRoute";
import userAdminRoutes from "./routes/UserAdminRoutes";
import adminOrderRoutes from "./routes/AdminOrderRoutes";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
    res.send("WELCOME TO RABBIT API");
});

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscribeRoutes);

// Admin Routes
app.use("/api/admin/user", userAdminRoutes);
app.use("/api/admin/order", adminOrderRoutes);

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
