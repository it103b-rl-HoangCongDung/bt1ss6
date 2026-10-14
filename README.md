# BÁO CÁO BÀI TẬP: XÂY DỰNG PHÂN HỆ BÁN LẺ PHỤ KIỆN VÀ XỬ LÝ BIÊN LAI DÒNG LỆNH PHÒNG GYM

> 👤 **Học viên:** Hoàng Công Dũng | **Mã SV:** PTIT-HCM-009
> 🏫 **Môn học:** it103b-rl-HoangCongDung

---

## 📊 Sơ đồ thiết kế hệ thống (Activity Diagram)

> 💡 *Sơ đồ dưới đây được render tự động trực tiếp trên GitHub bằng Mermaid. Bạn cũng có thể tải file **`bt1.drawio`** trong repository này để mở và chỉnh sửa trực tiếp trên [Draw.io (diagrams.net)](https://app.diagrams.net).* 

```mermaid
graph TD
  Start([Bắt đầu chương trình]) --> ShowMenu[Hiển thị Menu tương tác do-while]
  ShowMenu --> UserInput{Đọc lựa chọn từ người dùng}
  
  UserInput -- '1' --> Step1[Nhập và chuẩn hóa mã đơn hàng]
  Step1 --> ValidateCode{Kiểm tra mã: trim(), toUpperCase(), length >= 8?}
  ValidateCode -- Không hợp lệ --> ErrCode[Thông báo lỗi mã đơn hàng không hợp lệ] --> ShowMenu
  ValidateCode -- Hợp lệ --> SetFlag[Gắn cờ isOrderValid = true] --> ShowMenu
  
  UserInput -- '2' --> CheckValid{isOrderValid == true?}
  CheckValid -- Chưa nhập/Sai mã --> WarnInvalid[Cảnh báo: Cần nhập mã đơn hợp lệ trước!] --> ShowMenu
  CheckValid -- Đã hợp lệ --> Step2[Nhập mã phụ kiện & xử lý bóc tách bằng for, slice]
  Step2 --> CalcTotal[Tính tiền: SHAKER 120k, GLOVES 180k, STRAP 150k]
  CalcTotal --> CheckVIP{Khách có thẻ VIP?}
  CheckVIP -- Có VIP --> ApplyDiscount[Áp dụng giảm giá 10% tổng tiền] --> PrintInvoice
  CheckVIP -- Không VIP --> PrintInvoice[In hóa đơn dạng bảng dùng repeat và padStart]
  PrintInvoice --> ShowMenu
  
  UserInput -- '3' --> Exit([Thoát chương trình: Tạm biệt])
  UserInput -- Khác --> DefaultErr[Lựa chọn không hợp lệ, vui lòng chọn lại 1-3] --> ShowMenu
```

---

## Nhiệm vụ 1: Mục tiêu và Phân tích bài toán thực tế

Bài tập này yêu cầu tự tay code một phân hệ bán lẻ phụ kiện thu nhỏ tại quầy lễ tân phòng Gym Fitness bằng Javascript thuần chạy trên môi trường dòng lệnh (Console).

Để làm bài này mượt mà, mình đã kết hợp cấu trúc lặp do-while với switch-case để tạo ra một menu điều khiển trực quan, liên tục lặp lại cho đến khi nhân viên chủ động chọn thoát.

- Sử dụng triệt để các phương thức xử lý chuỗi: trim() để xóa khoảng trắng thừa, toUpperCase() để đồng nhất mã, startsWith() kiểm tra tiền tố, và slice() để cắt chuỗi lấy thông tin đơn hàng.
- Ứng dụng hàm .repeat() để vẽ khung viền hóa đơn liền mạch và .padStart() để căn lề cột con số ngay ngắn, thẳng hàng giống hệt hóa đơn in nhiệt thực tế.

## Nhiệm vụ 2: Quy tắc nghiệp vụ và Xử lý bẫy dữ liệu (Edge Cases)

Trong quá trình làm bài, mình đã chú ý xử lý các bẫy logic rất quan trọng mà giảng viên thường hay chấm điểm khắt khe:

Thứ nhất, tính bảo mật và ràng buộc luồng nghiệp vụ: Nghiêm cấm nhân viên nhảy cóc vào chức năng tính tiền (nhánh 2) khi chưa thực hiện nhập và chuẩn hóa mã đơn hàng ở nhánh 1. Mình đã dùng biến cờ 'isOrderValid' để kiểm soát chặt chẽ điều kiện này.

Thứ hai, xử lý các ký tự nhập linh tinh từ nhân viên: Mã đơn hàng bắt buộc phải qua bước làm sạch bằng .trim() và chuyển lên chữ hoa .toUpperCase(), đồng thời kiểm tra độ dài tối thiểu là 8 ký tự.

- Bảng giá niêm yết chuẩn: SHAKER (Bình lắc): 120.000 VNĐ, GLOVES (Găng tay tập tạ): 180.000 VNĐ, STRAP (Dây kéo lưng): 150.000 VNĐ.
- Chính sách ưu đãi hội viên VIP: Tự động trừ 10% tổng giá trị đơn hàng nếu khách hàng xuất trình thẻ VIP hợp lệ.
- Xử lý ngoại lệ nhánh default: Bắt toàn bộ các phím bấm linh tinh ngoài 1, 2, 3 để chương trình không bị crash đột ngột.

## Nhiệm vụ 3: Bảng đặc tả chi tiết các bước xử lý dòng lệnh

Dưới đây là bảng tổng hợp các bước thao tác và phản hồi của chương trình qua từng lựa chọn menu:

| Lựa chọn | Tác vụ thực hiện | Hàm/Kỹ thuật Javascript áp dụng | Kết quả đầu ra dự kiến |
| --- | --- | --- | --- |
| Phím 1 | Nhập & chuẩn hóa mã đơn hàng | trim(), toUpperCase(), length >= 8 | Lưu mã hợp lệ, bật cờ 'isOrderValid = true' |
| Phím 2 | Tính tiền & In biên lai phụ kiện | for loop, slice(), .repeat(), .padStart() | Kiểm tra cờ, bóc tách phụ kiện, áp dụng giảm giá VIP và in hóa đơn |
| Phím 3 | Thoát chương trình | Break vòng lặp do-while | In lời chào tạm biệt và kết thúc tiến trình Node.js |
| Khác | Xử lý lựa chọn không hợp lệ | Nhánh default trong switch-case | Báo lỗi tương tác và yêu cầu chọn lại từ 1 đến 3 |

## Nhiệm vụ 4: Hướng dẫn kiểm thử và Chạy mã nguồn thực tế

File source code đã được hoàn thiện đúng chuẩn yêu cầu với tên 'practice_gym_retail.js' và được đặt ngay trong thư mục gốc của repository 'it103b-rl-HoangCongDung'.

Mình đã chuẩn bị sẵn 3 trường hợp thử nghiệm (Test Cases) để thầy cô và các bạn kiểm chứng trực tiếp khi chạy lệnh 'node practice_gym_retail.js'.

- Trường hợp 1: Nhập mã đơn hàng hợp lệ, mua combo phụ kiện và có thẻ VIP (giảm 10%).
- Trường hợp 2: Cố tình chọn tính năng 2 khi chưa nhập mã đơn hàng (kiểm tra cơ chế chặn lỗi).
- Trường hợp 3: Bấm phím 3 để thoát chương trình an toàn.

---

## 📁 Danh sách tệp tin nộp bài trong Repository
- 📝 `bt1.docx`: Báo cáo tài liệu phân tích nghiệp vụ hoàn chỉnh.
- 🎨 `bt1.drawio`: File thiết kế sơ đồ chuẩn theo quy định đề bài (mở trực tiếp bằng [Draw.io](https://app.diagrams.net) hoặc Lucidchart).
- 💻 `practice_gym_retail.js`: Mã nguồn chương trình.
