import { Request, Response } from "express";
import { LoginData, RegisterData } from "../types/data.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password }: RegisterData = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill all details",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      // return if user already exist with given email
      return res.status(401).json({
        success: false,
        message: "E-mail already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hashing password with bcrypt
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password }: LoginData = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill all details",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // return if user with this email not found
      return res.status(401).json({
        success: false,
        message: "email or password is incorrect",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      // return if password is not valid
      return res.status(401).json({
        success: false,
        message: "email or password is incorrect",
      });
    }

    const token = generateToken(user._id as string); // generating token
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        message: `Welcome back ${user.name}`,
        user: {
          // user without passsword
          name: user.name,
          _id: user._id,
          __v: user.__v,
          email: user.email,
          role: user.role,
          enrolledCourses: user.enrolledCourses,
          profilePicture: user.profilePicture,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (_: Request, res: Response): Promise<any> => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      // setting token to empty string
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.id; // getting user id

    const user = await User.findById(userId);
    if (!user) {
      // checking user if null
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get your profile data",
    });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePicture = req.file;

    const user = await User.findById(userId);
    if (!user) {
      // returning user if null
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // extract publicId of the old image from the url if it is exist
    if (user?.profilePicture?.trim()) {
      const publicId = user.profilePicture.split("/").pop()?.split(".")[0];
      if (publicId) {
        deleteMediaFromCloudinary(publicId);
      }
    }

    // upload new photo
    if (profilePicture) {
      const cloudResponse = await uploadMedia(profilePicture.path);
      const profileUrl = cloudResponse?.secure_url;

      const updatedData = { name, profilePicture: profileUrl };
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Update profile failed",
    });
  }
};
