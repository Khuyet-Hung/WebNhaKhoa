import dotenv from "dotenv";
import type { StringValue } from "ms";

// Load biến môi trường từ file .env
dotenv.config();

// Định nghĩa interface cho cấu hình
interface Config {
  env: string;
  port: number;
  db: {
    uri: string;
  };
  jwt: {
    secret: string;
    expiresIn: StringValue;
  };
}

// Định nghĩa cấu hình mặc định
const defaultConfig: Config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  db: {
    uri: process.env.DB_URI || "mongodb://localhost:27017/myapp",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn:
      (process.env.JWT_EXPIRES_IN as StringValue) || ("1H" as StringValue),
  },
};

// Xuất cấu hình để sử dụng trong ứng dụng
const config: Config = defaultConfig;

export default config;
