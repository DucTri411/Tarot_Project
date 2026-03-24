# Dự án AstroBunny (Thần số học & Tarot)

Dự án Web hỗ trợ tra cứu thần số học và bốc bài Tarot hiển thị kết quả, được xây dựng với **React (Vite) + TailwindCSS v4** cho Frontend và **Node.js (Express)** cho Backend.

## Yêu cầu hệ thống (Prerequisites)
1. **Node.js**: Phiên bản 18.x trở lên.
2. **Docker**: Dùng để chạy máy chủ MySQL nội bộ cực kỳ ổn định.

## Cài đặt và chạy dự án

### Bước 1: Khởi động cơ sở dữ liệu (MySQL bằng Docker)
- Mở CMD ở **thư mục gốc của dự án** (nơi có file `docker-compose.yml`).
- Chạy lệnh sau để khởi động Database ngầm:
  ```cmd
  docker-compose up -d
  ```

### Bước 2: Cấu hình môi trường
- Vào thư mục `backend`, copy file `.env.example` và đổi tên nó thành `.env`. (Nếu đã có file `.env` chứa `DB_PASSWORD=root` thì bỏ qua).

### Bước 3: Cài đặt thư viện của toàn bộ dự án
- Tại **thư mục gốc của dự án** (AstroBunny), tiến hành cài đặt:
  ```cmd
  npm run install:all
  ```
- *Lệnh này sẽ tự động tải thư viện cho thư mục gốc, thư mục `backend` và thư mục `frontend`.*
- Sau khi cài đặt xong, nếu Terminal hiện cảnh báo về bảo mật (vulnerabilities), hãy chạy lệnh sau tại thư mục gốc để khắc phục:
  ```cmd
  npm audit fix
  ```

### Bước 4: Tạo dữ liệu mẫu database
- Tại **thư mục gốc của dự án**, chạy lệnh để tạo các bảng dữ liệu Users:
  ```cmd
  npm run db:setup
  ```
- Đứng ở **thư mục gốc của dự án AstroBunny**, chỉ cần chạy 1 lệnh duy nhất:
  ```cmd
  npm start
  ```
- Lệnh này sẽ tự động chạy song song cả 2 Server:
  - Backend Node.js chạy ngầm ở màn hình dòng lệnh.
  - Frontend Vite React chạy và cung cấp cho bạn link web (Thường là: `http://localhost:5173`).

Bạn có thể thoát máy chủ bằng tổ hợp phí `Ctrl + C`.