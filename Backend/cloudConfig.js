import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function uploadToCloudinary(localFilePath) {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      timeout: 120000,
    });
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting local file:", err);
    });

    return result; // contains url, public_id, etc
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}
export {uploadToCloudinary};