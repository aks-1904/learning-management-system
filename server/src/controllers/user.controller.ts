import { Request, Response } from "express";
import { LoginData, RegisterData } from "../types/data.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

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
