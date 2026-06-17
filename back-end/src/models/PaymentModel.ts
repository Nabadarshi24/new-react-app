import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    userId: {
        type: String,
        // required: true
    },
    amount: {
        type: Number,
        // required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    trxID: {
        type: String,
        // required: true
    },
    date: {
        type: String,
        // required: true
    }
}, { timestamps: true });

export const Payment = model('Payment', paymentSchema);