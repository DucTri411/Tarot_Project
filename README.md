# Đồ án Thần Số Học & Tarot

Dự án Web hỗ trợ tra cứu Thần Số Học và bốc bài Tarot hiển thị kết quả.

## Yêu cầu Hệ thống (Prerequisites)
1. **Node.js**: Phiên bản 16.x trở lên.
2. **Cơ sở dữ liệu**: MySQL (có thể dùng XAMPP để khởi chạy máy chủ MySQL nội bộ).

## Cài đặt và Chạy dự án (Dành cho thành viên tải code về)

### Bước 1: Khởi động MySQL (Database)
- Nếu dùng XAMPP, mở XAMPP Control Panel và bật **Start** ở module **MySQL**.

### Bước 2: Cài đặt thư viện Backend
- Mở **Terminal hoặc CMD** ở thư mục `backend`.
- Chạy lệnh sau để tải các gói thư viện cần thiết:
  ```bash
  npm install
  ```

### Bước 3: Thiết lập Biến môi trường (.env)
- Trong thư mục `backend`, copy file `.env.example` và đổi tên thành `.env`.
- Mở file `.env` và điền lại các thông số cấu hình nếu bạn có cài mật khẩu MySQL (Mặc định XAMPP thì user là `root` và password để trống).

### Bước 4: Tạo Cơ sở dữ liệu
- Khi đang đứng trong thư mục `backend`, chạy script khởi tạo dữ liệu tự động:
  ```bash
  node setup_db.js
  ```
  *(Lệnh này sẽ tự động tạo database `numerology_tarot` và bảng `users` cho bạn)*

### Bước 5: Khởi động Máy chủ (Server)
- Bật Server để frontend có thể gọi API đăng nhập, thần số học:
  ```bash
  node app.js
  ```
- **Lưu ý:** Không được tắt cửa sổ dòng lệnh này trong suốt quá trình sử dụng Web.

### Bước 6: Sử dụng Web (Frontend)
- Chỉ cần mở trực tiếp file `index.html` (Nằm trong thư mục `UI`) bằng trình duyệt (Chrome, Edge, Cốc Cốc...) và bắt đầu sử dụng.