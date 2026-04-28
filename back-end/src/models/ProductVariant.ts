import mongoose, { models, Schema } from "mongoose";

export interface IProductVariant {
  _id: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  // variantId: string;
  sizeAspectId: string;
  colorAspectId: string;
  countInStock: number;
  sku: string;
  price: number;
  discountPrice?: number;
};

const productVariantSchema = new Schema<IProductVariant>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  // variantId: {
  //   type: String,
  //   required: true
  // },
  sizeAspectId: {
    type: String,
    required: true
  },
  colorAspectId: {
    type: String,
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

productVariantSchema.virtual('colorAspect', {
  ref: 'Aspect',            // The model to join with
  localField: 'colorAspectId', // The field in Product
  foreignField: 'id',     // The unique field in Aspect
  justOne: true           // Returns an object, not an array
});

productVariantSchema.virtual('sizeAspect', {
  ref: 'Aspect',            // The model to join with
  localField: 'sizeAspectId', // The field in Product
  foreignField: 'id',     // The unique field in Aspect
  justOne: true           // Returns an object, not an array
});

// Ensure virtuals show up when converting to JSON/Objects
productVariantSchema.set('toObject', { virtuals: true });
productVariantSchema.set('toJSON', { virtuals: true });

const ProductVariant = mongoose.model<IProductVariant>("ProductVariant", productVariantSchema);

export default ProductVariant;