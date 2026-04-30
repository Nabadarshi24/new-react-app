import { IProductVariant } from "../models/ProductVariant";
import mongoose from "mongoose";


export const productVariantIds = {
  id00_00: new mongoose.Types.ObjectId(),
  id00_01: new mongoose.Types.ObjectId(),
  id00_02: new mongoose.Types.ObjectId(),
  id01_00: new mongoose.Types.ObjectId(),
  id02_00: new mongoose.Types.ObjectId(),
};

export const productIds = {
  id00: new mongoose.Types.ObjectId(),
  id01: new mongoose.Types.ObjectId(),
  id02: new mongoose.Types.ObjectId(),
};

export const productVariants: IProductVariant[] = [
  {
    _id: productVariantIds.id00_00,
    productId: productIds.id00,
    // variantId: "variant-1",
    sizeAspectId: "size-xs",
    colorAspectId: "color-red",
    countInStock: 10,
    sku: "SKU-123",
    price: 100,
    discountPrice: 90
  },
  {
    _id: productVariantIds.id00_01,
    productId: productIds.id00,
    // variantId: "variant-2",
    sizeAspectId: "size-s",
    colorAspectId: "color-blue",
    countInStock: 20,
    sku: "SKU-456",
    price: 120,
    discountPrice: 110
  },
  {
    _id: productVariantIds.id00_02,
    productId: productIds.id00,
    // variantId: "variant-3",
    sizeAspectId: "size-m",
    colorAspectId: "color-green",
    countInStock: 30,
    sku: "SKU-789",
    price: 140,
    discountPrice: 130
  },
  {
    _id: productVariantIds.id01_00,
    productId: productIds.id01,
    // variantId: "variant-4",
    sizeAspectId: "size-l",
    colorAspectId: "color-yellow",
    countInStock: 40,
    sku: "SKU-012",
    price: 160,
    discountPrice: 150
  },
  {
    _id: productVariantIds.id02_00,
    productId: productIds.id02,
    // variantId: "variant-5",
    sizeAspectId: "size-xl",
    colorAspectId: "color-black",
    countInStock: 50,
    sku: "SKU-345",
    price: 180,
    discountPrice: 150
  }
];