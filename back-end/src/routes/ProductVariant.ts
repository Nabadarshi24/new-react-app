import mongoose, { Schema } from "mongoose";

export interface IProductVariant {
  productId: mongoose.Types.ObjectId;
  variantId: string;
  sizes: string[];
  colors: string[];
  countInStock: number;
  sku: string;
  price: number;
  discountPrice?: number;
};

const productVariantSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  variantId: {
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
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number
  }
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariant;