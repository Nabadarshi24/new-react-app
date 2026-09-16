import mongoose, { Schema } from "mongoose";

interface ICartItem {
  _id: string;
  productId: Schema.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

interface ICartSchema {
  user: Schema.Types.ObjectId;
  guestId: string | null;
  products: ICartItem[];
  totalPrice: number;
  lastModified: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  _id: {
    type: String,
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: String,
  image: String,
  price: Number,
  size: String,
  color: String,
  quantity: {
    type: Number,
    default: 1
  }
},
  { _id: false }
);

const cartSchema = new Schema<ICartSchema>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  guestId: {
    type: String,
    default: null
  },
  products: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0,
    required: true
  },
  // lastModified: {
  //   type: Date,
  //   default: Date.now,
  //   expires: 7200
  // }
},
  { timestamps: true }
);

// Explicitly add the TTL index to the managed 'updatedAt' field
cartSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 7200 });

const Cart = mongoose.model<ICartSchema>("Cart", cartSchema);

export default Cart;

