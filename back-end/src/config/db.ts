import mongoose from "mongoose";

export const connectDB = async () => {

    console.log("Connecting to:", process.env.MONGODB_URI);

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            serverSelectionTimeoutMS: 5000,
            tlsAllowInvalidCertificates: true
        });
        // await mongoose.connect('mongodb://127.0.0.1:27017/Cluster0');
        console.log("MongoDB connected");
    } catch (error: any) {
        console.error("MongoDB connection error:", error);
        // console.dir(error, { depth: null });
        process.exit(1);
    }
};

// module.exports = connectDB;
