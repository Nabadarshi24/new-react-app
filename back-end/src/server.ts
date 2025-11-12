import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import connectDB from "./config/db";
import routes from "./routes/UserRoutes";
import { connectDB } from "./config/db";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
    res.send("WELCOME TO RABBIT API");
});

// User Routes
app.use("/api/users", routes);

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
