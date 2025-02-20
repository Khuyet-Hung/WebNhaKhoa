import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import authService from "../services/auth.service";
import { errorResponse, successResponse } from "../utils/responseHandler";

const register = async (req: Request, res: Response): Promise<Response> => {
  const { fullName, email, password } = req.body;
  try {
    const user: IUser = await authService.register(fullName, email, password);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, user);
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
};

// const login = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const token: string = await authService.login(req.body);
//     res.json({ token });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export default { register };
