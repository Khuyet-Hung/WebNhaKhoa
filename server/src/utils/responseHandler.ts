import { Request, Response } from "express";
import { ApiResponse } from "../interfaces/apiResponse.interface";

// Hàm trả về response thành công
export const successResponse = <T>(
  res: Response,
  data: T,
  statusCode: number = 200
) => {
  const response: ApiResponse<T> = {
    error: false,
    statusCode,
    data,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
};

// Hàm trả về response lỗi
export const errorResponse = (
  res: Response,
  errorMessage: string,
  statusCode: number = 500
) => {
  const response: ApiResponse = {
    error: true,
    statusCode,
    errorMessage,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(response);
};
