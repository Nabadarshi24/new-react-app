import mongoose, { Schema } from "mongoose";

interface Product {
  productName: string;
  description: string;
  price: number;
  discountPrice: number;
  countInStock: number;
  sku: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  collections: string;
  material: string;
  gender: string;
  images: {
    url: string;
    altText: string;
  }[];
  isFeatured: boolean;
  isPublished: boolean;
  rating: number;
  numberOfReviews: number;
  tags: string[];
  user: mongoose.Schema.Types.ObjectId;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  dimensions: {
    width: number;
    height: number;
    length: number;
  };
  weight: number;
};

const productSchema = new Schema<Product>({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  sizes: {
    type: [String],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  collections: {
    type: String,
    required: true
  },
  material: {
    type: String
  },
  gender: {
    type: String,
    enum: ["Men", "Women", "Unisex"]
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      altText: {
        type: String
      }
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  metaKeywords: {
    type: String
  },
  dimensions: {
    width: Number,
    height: Number,
    length: Number
  },
  weight: Number
},
  {
    timestamps: true
  }
);

const Product = mongoose.model<Product>("Product", productSchema);

export default Product;
