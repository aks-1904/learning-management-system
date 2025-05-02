import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // cloudinary cloud name
  api_secret: process.env.CLOUD_API_SECRET, // cloudinary api secret
  api_key: process.env.CLOUD_API_KEY, // cloudinary api key
});

// for uploading media to cloudinary
export const uploadMedia = async (file: string) => {
  try {
    const uplaodResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // auto fetch type (example:- video or image)
    });
    return uplaodResponse;
  } catch (error) {
    console.log(error);
  }
};

// Delete any image from cloudinary
export const deleteMediaFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

// Delete any video from cloudinary
export const deleteVideoFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error);
  }
};
