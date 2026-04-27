import mongoose, { model, Schema } from "mongoose";

interface IProduct {
  productName: string;
  productVariantIds: string[];
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
  // material: string;
  materialAspectId: string;
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
  // user: mongoose.Schema.Types.ObjectId;
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

const productSchema = new Schema<IProduct>({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  productVariantIds: [{
    type: String
  }],
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
  // material: {
  //   type: String
  // },
  materialAspectId: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["men", "women", "unisex"]
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
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true
  // },
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

productSchema.virtual('materialAspect', {
  ref: 'Aspect',            // The model to join with
  localField: 'materialAspectId', // The field in Product
  foreignField: 'id',     // The unique field in Aspect
  justOne: true           // Returns an object, not an array
});

productSchema.virtual('productVariants', {
  ref: 'ProductVariant',            // The model to join with
  localField: 'productVariantIds', // The field in Product
  foreignField: 'variantId',     // The unique field in ProductVariant
  justOne: false           // Returns an array of objects
});

// Ensure virtuals show up when converting to JSON/Objects
productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
