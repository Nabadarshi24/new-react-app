import dotenv from "dotenv";
import Product from "../models/Product";
import User from "../models/User";
import Cart from "../models/Cart";
import { products } from "../data/product";
import { connectDB } from "../config/db";
import { aspects } from "../data/aspect";
import { Aspect } from "../models/Aspect";
import { productVariants } from "../data/productVariant";
import ProductVariant from "../models/ProductVariant";

dotenv.config();

// Connect to MongoDB
connectDB();

// Function to seed data
const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await ProductVariant.deleteMany();
    await Cart.deleteMany();
    await Aspect.deleteMany();

    await Product.cleanIndexes();
    await ProductVariant.cleanIndexes();

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
      // user: defaultUserId
    }));

    const sampleAspect = aspects.map(aspect => aspect);
    const sampleProductVariants = productVariants.map(productVariant => productVariant);

    await Product.insertMany(sampleProducts);
    await Aspect.insertMany(sampleAspect);
    await ProductVariant.insertMany(sampleProductVariants);

    console.log("Product data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedData();
