import express, { Request, Response } from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

const uploadFile = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(404).json({
        message: "File not found",
        success: true,
      });
    }
    const result = await uploadMedia(req.file.path);
    return res.status(200).json({
      message: "File uploaded successfully",
      data: result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to upload video",
    });
  }
};

router.route("/upload-video").post(upload.single("file"), uploadFile);

export default router;
