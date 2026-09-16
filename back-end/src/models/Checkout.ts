import mongoose, { Schema } from "mongoose";

interface ICheckoutItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

interface IPaymentDetails {
  paymentID?: string;
  trxID?: string;
  paymentExecuteTime?: string;
  amount?: string | number;
  merchantInvoiceNumber?: string;
}

interface ICheckout {
  user: mongoose.Types.ObjectId;
  checkoutItems: ICheckoutItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  paymentStatus: string;
  paymentDetails: IPaymentDetails;
  isFinalized: boolean;
  finalizedAt: Date;
}

const checkoutItemSchema = new Schema<ICheckoutItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
},
  { _id: false }
);

const paymentDetailsSchema = new Schema<IPaymentDetails>({
  paymentID: {
    type: String
  },
  trxID: {
    type: String
  },
  paymentExecuteTime: {
    type: String
  },
  amount: {
    type: Number
  },
  merchantInvoiceNumber: {
    type: String
  }
},
  { _id: false }
);

const checkoutSchema = new Schema<ICheckout>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  checkoutItems: [checkoutItemSchema],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },
  paymentDetails: {
    type: paymentDetailsSchema,
    default: null
  },
  isFinalized: {
    type: Boolean,
    default: false
  },
  finalizedAt: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model<ICheckout>("Checkout", checkoutSchema);