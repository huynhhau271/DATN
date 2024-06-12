export const mailConfirm = (
    customerName: string,
    phone: String,
    dob: string,
    vaccine: string,
    date: string,
    key: string,
    CCCD: string
) => {
    return `
        <h1 style="text-align: center;">THƯ XÁC NHẬN ĐĂNG KÝ TIÊM CHỦNG</h1> 
        <p>Kính gửi <strong>Quý khách hàng</strong>,</p>
        <p> Chúng tôi xin chân thành cảm ơn quý khách đã tin tưởng và đăng ký tiêm chủng tại trung tâm tiêm chủng vắc xin Đại Lộc. Chúng tôi rất vui mừng thông báo rằng quý khách đã đăng ký tiêm chủng thành công với thông tin chi tiết như sau: </p>
        <h2>Thông tin đăng ký:</h2>
        <p>Họ và tên người tiêm: <strong>${customerName}</strong></p>
        <p>Ngày Sinh: <strong>${dob}</strong></p>
        <p>Mã Định Danh: <strong>${CCCD}</strong></p>
        <p>Số Điện Thoại: <strong>${phone}</strong></p>
        <p>Tên Vaccine: <strong>${vaccine}</strong></p>
        <p>Ngày Tiêm: <strong>${date}</strong></p>
        <p>Để hoàn tất quá trình đăng ký, quý khách hàng vui lòng sử dụng <strong> mã OTP dưới đây</strong> để xác nhận thông tin của mình. Mã này có hiệu lực trong vòng 10 phút kể từ thời điểm nhận được email này</p>
        <h1 style="text-align: center; color:blue">${key}</h1>
        <p>Trân Trọng</p>
        <h2>PHÒNG TIÊM CHỦNG VACXIN ĐẠI LỘC</h2>
        <div><strong>Địa chỉ:</strong> <p>18 Phạm Văn Đồng - TT. Ái Nghĩa - Đại Lộc - Quảng Nam</p></div>
        <div ><strong>Số điện thoại:</strong> <p> 0905.470.207</p></div>
        `;
};
