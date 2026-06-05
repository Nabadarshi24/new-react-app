import mongoose, { Schema } from "mongoose";

interface ISubscriber {
  email: string;
  subscribedAt: Date;
}

const subscriberSchema = new Schema<ISubscriber>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

const Subscriber = mongoose.model<ISubscriber>("Subscriber", subscriberSchema);

export default Subscriber;