import express from "express";
import Product from "../models/Products";
import { admin, protect } from "../middleware/authMiddleware";

const router = express.Router();

// @route POST /api/products
// @desc Create new product
// @access Private/admin
router.post("/create", protect, admin, async (req, res) => {
  try {
    const {
      productName,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numberOfReviews,
      tags,
      dimensions,
      weight,
      sku
    } = req.body;

    const product = new Product({
      productName,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numberOfReviews,
      tags,
      dimensions,
      weight,
      sku,
      user: req.body.user.id, // reference to the admin user who created it

    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
