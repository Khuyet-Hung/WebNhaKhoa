import express from 'express';
import config from './config/config';
import connectDB from './config/db';

const app = express();

// Kết nối cơ sở dữ liệu
connectDB();

// Khởi động server
app.listen(config.port, () => {
  console.log(`Server is running in ${config.env} mode on port ${config.port}`);
});