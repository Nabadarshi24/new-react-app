import mongoose, { Schema } from "mongoose";

interface ICartItem {
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
  guestId: string;
  products: ICartItem[];
  totalPrice: number;
}

const cartItemSchema = new Schema<ICartItem>({
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
    type: String
  },
  products: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0,
    required: true
  }
},
  { timestamps: true }
);

const Cart = mongoose.model<ICartSchema>("Cart", cartSchema);

export default Cart;

