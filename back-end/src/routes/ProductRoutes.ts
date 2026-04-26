import express, { Request, Response } from "express";
import Product from "../models/Products";
import { admin, protect } from "../middleware/authMiddleware";
import { Aspect } from "../models/Aspect";

const router = express.Router();

// @route POST /api/products/create
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

// @route PUT /api/products/update/:id
// @desc Update product
// @access Private/admin
router.put("/update/:id", protect, admin, async (req, res) => {
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

    const product = await Product.findById(req.params.id);

    if (product) {

      product.productName = productName || product.productName;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
      product.rating = rating || product.rating;
      product.numberOfReviews = numberOfReviews || product.numberOfReviews;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/products/delete/:id
// @desc Delete product
// @access Private/admin
router.delete("/delete/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/product/all
// @desc Get all products with optional query & filters
// @access Public
router.get("/all", async (req: Request, res: Response) => {
  try {
    const {
      collection,
      gender,
      category,
      material,
      brand,
      size,
      color,
      minPrice,
      maxPrice,
      sortBy,
      limit,
      search
    } = req.query;

    let query: Record<string, any> = {};

    // Filter logic
    if (collection && collection.toString().toLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toString().toLowerCase() !== "all") {
      query.category = category;
    }

    if (gender) query.gender = gender;
    if (color) query.color = { $in: [color] };
    if (size) query.sizes = { $in: size.toString().split(",") };
    if (material) query.material = { $in: material.toString().split(",") };
    if (brand) query.brand = { $in: brand.toString().split(",") };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }
    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Sort by logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Fetched products and apply sorting and limit
    let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);

    res.json({
      data: {
        items: products,
        pageIndex: 1,
        totalPages: 1,
        totalCount: products.length,
        hasPreviousPage: false,
        hasNextPage: false
      },
      success: true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/product/best-seller
// @desc retrieve the product with highest rating
// @access Public
router.get("/best-seller", async (req: Request, res: Response) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });

    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/product/new-arrivals
// @desc retrieve the latest 8 products with creation date
// @access Public
router.get("/new-arrivals", async (req: Request, res: Response) => {
  try {
    const newArrival = await Product.find().sort({ createdAt: -1 }).limit(8);

    res.json(newArrival);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/product/details/:id
// @desc Get single product details
// @access Public
router.get("/details/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/product/similar/:id
// @desc Get similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      const similarProducts = await Product.find({
        _id: { $ne: id }, // Exclude the current product
        gender: product.gender,
        category: product.category,
      }).limit(4);

      res.json(similarProducts);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/product/filter-option
// @desc Get all product filter options
// @access Public
router.get("/filter-option", async (req: Request, res: Response) => {
  try {
    const options = await Aspect.find({});

    if (!options || options.length === 0) {
      return res.status(404).json({ message: "Filter options not found" });
    }

    res.status(200).json({
      data: options,
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

