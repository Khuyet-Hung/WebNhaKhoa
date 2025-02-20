import jwt from "jsonwebtoken";
import config from "../config/config";
import { Response } from "express";

/**
 * Tạo token JWT
 * @param payload - Dữ liệu cần mã hóa
 * @returns Token JWT
 */
export const generateToken = (userId: string, res: Response): string => {
  try {
    const token = jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict", // CSRF attacks cross-site request forgery attacks
      secure: process.env.NODE_ENV !== "development",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Could not generate token");
  }
};

/**
 * Xác thực token JWT
 * @param token - Token JWT
 * @returns Dữ liệu giải mã từ token
 */
export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwt.secret);
};
