import express, { Request, Response } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route POST /api/upload
// @desc Upload image to cloudinary
// @access Private

router.post("/", upload.single("image"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const streamUpload = (fileBuffer: Buffer): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        // Use streamifier to convert file buffer to a stream
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    res.status(201).json({
      imageUrl: result.secure_url,
      fileName: result.original_filename,
    });
  } catch (error) {
    console.log("Error uploading image:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;