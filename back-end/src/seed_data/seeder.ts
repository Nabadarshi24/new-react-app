import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Products";
import User from "../models/User";
import { products } from "../data/product";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)

// Function to seed data
const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "Admin1234$#",
      role: "admin"
    });

    //  Assign the default user ID to each product
    const defaultUserId = adminUser._id;

    const sampleProducts = products.map(product => ({
      ...product,
      user: defaultUserId
    }));

    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedData();
