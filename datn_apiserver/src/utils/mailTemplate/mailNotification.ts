export const mailNotification = (
    customerName: string,
    phone: String,
    dob: string,
    vaccine: string,
    date: string
) => {
    return `
        <h1 style="text-align: center;">THÔNG BÁO NHẮC NHỞ LỊCH TIÊM</h1> 
        <p>Kính gửi <strong>Quý khách hàng</strong>,</p>
        <p> Chúng tôi xin chân thành cảm ơn quý khách đã tin tưởng và đăng ký tiêm chủng tại trung tâm tiêm chủng vắc xin Đại Lộc. Chúng tôi rất vui mừng thông báo rằng quý khách đã đăng ký tiêm chủng thành công với thông tin chi tiết như sau: </p>
        <strong>
        Để đảm bảo quý khách không quên lịch hẹn tiêm chủng sắp tới, chúng tôi xin gửi thông báo nhắc nhở  đến Quý khách về lịch hẹn tiêm chủng sắp tới như sau:
        </strong>
        <h2>Thông tin lịch hẹn::</h2>
        <p>Họ và tên người tiêm: <strong>${customerName}</strong></p>
        <p>Ngày Sinh: <strong>${dob}</strong></p>
        <p>Số Điện Thoại: <strong>${phone}</strong></p>
        <p>Loại Vaccine: <strong>${vaccine}</strong></p>
        <p>Ngày Tiêm: <strong>${date}</strong></p>
        <h2>Lưu ý quan trọng:</h2>
        <ul>
            <li>Quý khách vui lòng đến đúng ngày hẹn và mang theo sổ tiêm chủng (nếu có).</li>
            <li>Để đảm bảo an toàn, quý khách nên nghỉ ngơi đầy đủ và ăn nhẹ trước khi đến tiêm.</li>
            <li>Sau khi tiêm, quý khách sẽ được theo dõi tại trung tâm trong khoảng 30 phút để đảm bảo không có phản ứng phụ ngay lập tức.</li>
            <li>Nếu quý khách có bất kỳ câu hỏi hoặc cần thay đổi thông tin đăng ký, vui lòng liên hệ với chúng tôi qua số điện thoại 0905.470.207.</li>
        </ul>
        <strong>
        Chúng tôi mong muốn được phục vụ quý khách và hy vọng rằng quý khách sẽ có trải nghiệm tiêm chủng an toàn và thoải mái tại trung tâm của chúng tôi.
        </strong>
        <p>Trân Trọng</p>
        <h2>PHÒNG TIÊM CHỦNG VACXIN ĐẠI LỘC</h2>
        <div><strong>Địa chỉ:</strong> <p>18 Phạm Văn Đồng - TT. Ái Nghĩa - Đại Lộc - Quảng Nam</p></div>
        <div ><strong>Số điện thoại:</strong> <p> 0905.470.207</p></div>
        `;
};
