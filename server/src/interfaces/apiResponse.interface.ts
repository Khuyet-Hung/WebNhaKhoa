export interface ApiResponse<T = any> {
  error: boolean; // Xác định API có lỗi hay không
  statusCode: number; // Mã trạng thái HTTP
  errorMessage?: string; // Thông báo lỗi (nếu có)
  data?: T; // Dữ liệu trả về (có thể là bất kỳ kiểu dữ liệu nào)
  timestamp?: string; // Thời gian phản hồi (tùy chọn)
  path?: string; // Đường dẫn API được gọi (tùy chọn)
}
