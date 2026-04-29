import mongoose, { model, Schema } from "mongoose";
import { IProductVariant } from "./ProductVariant";
import { IAspect } from "../data/aspect";

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  productName: string;
  // productVariantIds: string[];
  description: string;
  category: string;
  brand: string;
  collections: string;
  materialAspectId: string;
  gender: string;
  images: {
    url: string;
    altText: string;
  }[];
  isFeatured: boolean;
  isPublished: boolean;
  rating: number;
  minPrice: number;
  maxPrice: number;
  numberOfReviews: number;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  dimensions: {
    width: number;
    height: number;
    length: number;
  };
  weight: number;
  countInStock: number;
  materialAspect: IAspect;
  productVariants: IProductVariant[];
};

const productSchema = new Schema<IProduct>({
  
  productName: {
    type: String,
    required: true,
    trim: true
  },
  // productVariantIds: [{
  //   type: String
  // }],
  // productVariants: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'ProductVariant'
  // }],
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
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
  localField: '_id', // The field in Product
  foreignField: 'productId',     // The unique field in ProductVariant
  justOne: false           // Returns an array of objects
});

productSchema.virtual('minPrice', {
  ref: 'ProductVariant',
  localField: '_id',
  foreignField: 'productId',
  justOne: true
  // count: true, // Set to true to count instead of return docs,
}).get(function () {
  const prices = this.productVariants.map(x => x.price);
  return 0 || Math.min(...prices);
});

productSchema.virtual('maxPrice', {
  ref: 'ProductVariant',
  localField: '_id',
  foreignField: 'productId',
  justOne: true
  // count: true, // Set to true to count instead of return docs,
}).get(function () {
  const prices = this.productVariants.map(x => x.price);
  return 0 || Math.max(...prices);
});

productSchema.virtual('countInStock', {
  ref: 'ProductVariant',
  localField: '_id',
  foreignField: 'productId',
  justOne: false
  // count: true, // Set to true to count instead of return docs,
}).get(function () {
  return this.productVariants?.reduce((acc: number, curr: any) => acc + curr.countInStock, 0);
});

// https://mongoosejs.com/docs/tutorials/virtuals.html#virtuals-in-json
productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
