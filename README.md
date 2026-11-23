# Mạ Story AI – Truyện kể dân tộc Mạ số

Nền tảng học liệu số lưu giữ, giới thiệu và trải nghiệm truyện kể dân gian dân tộc Mạ tại xã Tà Đùng, tỉnh Lâm Đồng dành cho giáo viên và học sinh THCS.

## 1. Cấu trúc thư mục dự án

```text
ma-story-ai-webapp/
├── api/
│   └── gemini.ts                # Serverless Function bảo vệ GEMINI_API_KEY ở phía máy chủ
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Thanh điều hướng responsive
│   │   └── Footer.tsx           # Chân trang dự án
│   ├── contexts/
│   │   └── AuthContext.tsx      # Xác thực Google Sign-In (Popup + Redirect cho Edge) & phân quyền adminUsers
│   ├── data/
│   │   └── mockData.ts          # Dữ liệu minh họa chuẩn hóa (có gắn nhãn phân biệt)
│   ├── lib/
│   │   └── firebase.ts          # Khởi tạo Firebase Auth, Firestore, Storage
│   ├── pages/
│   │   ├── HomePage.tsx         # Trang chủ (Banner Tà Đùng, 6 công cụ nhanh, truyện nổi bật)
│   │   ├── StoryLibraryPage.tsx # Kho truyện (/kho-truyen)
│   │   ├── StoryDetailPage.tsx  # Chi tiết truyện (/kho-truyen/:slug)
│   │   ├── AudioStoriesPage.tsx # Nghe kể chuyện (/nghe-ke)
│   │   ├── CultureExplorePage.tsx # Khám phá văn hóa (/kham-pha)
│   │   ├── InteractiveLearningPage.tsx # Học tập tương tác (/hoc-tap)
│   │   ├── KnowledgeGamePage.tsx # Trò chơi kiến thức (/tro-choi)
│   │   ├── AiCreativePage.tsx   # Sáng tạo cùng AI (/sang-tao)
│   │   ├── AboutPage.tsx        # Giới thiệu dự án (/gioi-thieu)
│   │   ├── AdminLoginPage.tsx   # Đăng nhập quản trị (/admin/login)
│   │   └── AdminDashboard.tsx   # Bảng điều khiển giáo viên (/admin)
│   ├── types/
│   │   └── index.ts             # Định nghĩa kiểu dữ liệu TypeScript
│   ├── App.tsx                  # Bộ định tuyến ứng dụng
│   ├── index.css                # Cấu hình Tailwind CSS & font Be Vietnam Pro
│   └── main.tsx                 # Điểm khởi chạy React
├── .env.example                 # Mẫu biến môi trường
├── .gitignore                   # Loại trừ node_modules, dist, .env
├── firestore.rules              # Quy tắc bảo mật Cloud Firestore
├── storage.rules                # Quy tắc bảo mật Firebase Storage
├── index.html                   # HTML gốc tiếng Việt
├── package.json                 # Thư viện và kịch bản build
├── postcss.config.js            # Cấu hình PostCSS
├── tailwind.config.js           # Cấu hình màu sắc & font chữ nhận diện
├── tsconfig.json                # Cấu hình TypeScript
├── vercel.json                  # Định tuyến SPA & proxy /__/auth/* cho Microsoft Edge
└── vite.config.ts               # Cấu hình Vite
```

## 2. Hướng dẫn đưa mã nguồn lên GitHub

1. Giải nén tệp `ma-story-ai-webapp.zip` trên máy tính.
2. Mở Terminal (hoặc Command Prompt / Git Bash) bên trong thư mục `ma-story-ai-webapp`.
3. Tạo một kho lưu trữ mới (Repository) trên GitHub (ví dụ: `ma-story-ai`).
4. Chạy lần lượt các lệnh sau:
   ```bash
   git init
   git add .
   git commit -m "Khoi tao du an Ma Story AI"
   git branch -M main
   git remote add origin https://github.com/<TEN_TAI_KHOAN_GITHUB>/ma-story-ai.git
   git push -u origin main
   ```

## 3. Hướng dẫn triển khai lên Vercel

1. Truy cập [vercel.com](https://vercel.com), đăng nhập bằng GitHub và chọn **Add New > Project**.
2. Chọn repository `ma-story-ai` vừa đẩy lên.
3. Trước khi bấm Deploy, mở mục **Environment Variables** và thêm các biến từ tệp `.env.example`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_ADMIN_EMAILS` (nhập email Gmail quản trị của bạn)
   - `GEMINI_API_KEY` (nếu dùng chức năng Sáng tạo cùng AI)
4. Mở tệp `vercel.json`, thay `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` bằng Project ID Firebase của bạn (để trình duyệt Microsoft Edge đăng nhập Google mượt mà không bị chặn cookie bên thứ ba).
5. Bấm **Deploy**.

## 4. Thiết lập Firebase Authentication, Firestore & Storage

1. **Bật Google Sign-In:**
   - Vào **Firebase Console > Authentication > Sign-in method**, bật **Google**.
   - Vào **Authentication > Settings > Authorized domains**, nhấn **Add domain** và thêm tên miền Vercel của bạn (ví dụ: `ma-storybook-ai.vercel.app`).
2. **Cấp quyền quản trị viên (`adminUsers`):**
   - Đăng nhập thử 1 lần để lấy **User UID** trong mục **Authentication > Users**.
   - Vào **Firestore Database**, tạo collection `adminUsers`, thêm Document có **Document ID = User UID**, gồm 3 trường:
     - `email` (string): địa chỉ Gmail quản trị
     - `role` (string): `"admin"`
     - `active` (boolean): `true`
3. **Áp dụng Security Rules:**
   - Sao chép nội dung tệp `firestore.rules` dán vào tab **Firestore Database > Rules** rồi bấm **Publish**.
   - Sao chép nội dung tệp `storage.rules` dán vào tab **Storage > Rules** rồi bấm **Publish**.
