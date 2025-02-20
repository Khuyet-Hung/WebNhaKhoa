import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import config from "../config/config";
import { IUser } from "../interfaces/user.interface";

class AuthService {
  private userModel: Model<IUser>;

  constructor() {
    this.userModel = User;
  }

  /**
   * Đăng ký người dùng mới
   * @param username - Tên người dùng
   * @param email - Email
   * @param password - Mật khẩu
   * @returns Người dùng đã đăng ký
   */
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<IUser> {
    try {
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new Error("Email already exists");
      }
      // Tạo người dùng mới
      const user = new this.userModel({
        username,
        email,
        password: password,
      });

      // Lưu người dùng vào cơ sở dữ liệu
      await user.save();

      // Trả về người dùng đã đăng ký (không bao gồm mật khẩu)
      return user.toObject({ getters: true });
    } catch (error) {
      throw new Error("Have an error");
    }
  }

  /**
   * Đăng nhập người dùng
   * @param email - Email
   * @param password - Mật khẩu
   * @returns Token JWT
   */
  async login(email: string, password: string): Promise<string> {
    // Tìm người dùng theo email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Tạo và trả về token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return token;
  }
}

export default new AuthService();
