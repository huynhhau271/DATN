import React from 'react';
import '../styles/HandBook.css';

const HandBook = () => {
    return (
        <div className='parent'>
            <div className='HandBook'>
                <div className='vc_img'>
                    <img src="https://vnvc.vn/wp-content/uploads/2017/06/dc-luuy.jpg" alt="Vaccination Info" />
                </div>
                <p className="home">
                    <a href="/trang-chu">Trang chủ</a>
                    <span className="separator"> » </span>
                    <span className="last">NHỮNG ĐIỀU CẦN BIẾT TRƯỚC KHI TIÊM CHỦNG</span>
                </p>
                <div>
                    <div className="title">
                        <h1 className="gt-title">NHỮNG ĐIỀU CẦN BIẾT TRƯỚC KHI TIÊM CHỦNG</h1>
                    </div>
                </div>
                <hr />
            </div>
            <div className='HandBook_1'>
                <h2>Khám sàng lọc trước tiêm chủng</h2>
                <h3>1. Tại sao cần khám sàng lọc trước khi tiêm chủng</h3>
                <p>Khám sàng lọc trước khi tiêm chủng là việc rất cần thiết nhằm phát hiện những bất thường cần lưu ý để quyết định cho trẻ (người được tiêm) tiêm chủng, tạm hoãn việc tiêm chủng hay không được tiêm một loại vắc xin nào đó.</p>
                <p>Vì vậy, người nhà của trẻ hay người đi tiêm chủng và bác sĩ cần hợp tác với nhau để đảm bảo việc tiêm chủng là đúng thời điểm, hiệu quả và an toàn.</p>
                <p>Kết quả khám sàng lọc trước tiêm chủng được căn cứ trên những thông tin người nhà hay người đi tiêm chủng cung cấp cho bác sĩ và những thông tin bác sĩ phát hiện sau khi thăm khám.</p>
                <h3>2. Những thông tin cần thông báo cho bác sĩ là gì?</h3>
                <p>Với trẻ nhỏ, bố mẹ cần thông báo cho bác sĩ các vấn đề về sức khỏe và lịch sử tiêm chủng như:</p>
                <ul>
                    <li>Trẻ đã đủ cân nặng 2.5kg chưa? (Nếu là trẻ sơ sinh)</li>
                    <li>Trẻ có bú (ăn), uống, ngủ, chơi bình thường không?</li>
                    <li>Trẻ có đang sốt hay mắc bệnh gì không? Trẻ có bệnh lý bẩm sinh hoặc bệnh lý mắc phải khiến trẻ phải nhập viện điều trị từ khi sinh đến nay.</li>
                    <li>Trẻ có đang dùng thuốc hoặc sử dụng phương pháp điều trị nào không?</li>
                    <li>Trẻ có tiền sử dị ứng với thuốc hay thức ăn nào không?</li>
                    <li>Trẻ có tiền sử dị ứng với vắc xin hoặc có phản ứng nặng ở các lần tiêm trước hay không?</li>
                </ul>
            </div>
            <div className='HandBook_1'>
                <img src="https://hp.medcare.vn/wp-content/uploads/sites/5/2023/02/post-web-Tre-da-viem-phoi-viem-tai-giua-co-can-tiem-vac-xin-phe-cau-1024x745.png" alt="" />
            </div>
            <div className='HandBook_2'>
                <h2>Hướng dẫn trước khi tiêm chủng</h2>
                <h3>Với trẻ nhỏ:</h3>
                <ul>
                    <li>Bố mẹ cần theo dõi tình trạng sức khỏe của bé để thông báo cho bác sĩ trong quá trình khám sàng lọc trước khi tiêm.</li>
                    <li>Nếu trẻ chưa đạt tiêu chuẩn về cân nặng hoặc có một trong các biểu hiện bệnh lý thì phải trì hoãn lịch tiêm cho đến khi trẻ đủ cân nặng, hết sốt hoặc khỏi bệnh.</li>
                    <li>Nếu trẻ có các phản ứng nặng sau tiêm ở các lần tiêm trước thì sẽ ngưng tiêm các mũi tiếp theo (nếu có).</li>
                    <li>Khi đưa trẻ đi tiêm chủng, bố mẹ (người chăm sóc) cần mang đầy đủ sổ/phiếu tiêm chủng và thông báo đầy đủ tình trạng sức khỏe, các loại thuốc đang sử dụng để bác sĩ theo dõi và phối hợp cùng bố mẹ đưa ra lịch tiêm chủng hợp lý, tránh bỏ sót hay nhầm lẫn.</li>
                    <li>Tại cơ sở tiêm chủng, bác sĩ sẽ tiến hành khám sàng lọc cho trẻ và đánh giá toàn diện thể trạng của trẻ. Căn cứ vào kết quả khám và lịch sử tiêm chủng, bác sĩ sẽ phối hợp cùng bố mẹ lựa chọn mũi tiêm tiếp theo.</li>
                    <li>Bố mẹ nên tuân thủ lịch tiêm chủng theo lứa tuổi đã được Bộ Y Tế và các chuyên gia khuyến cáo. Việc tiêm chủng đúng thời điểm sẽ giúp tạo miễn dịch hiệu quả cho trẻ, tránh trường hợp mắc bệnh có thể xảy ra nếu chưa kịp tiêm chủng.</li>
                </ul>
            </div>
        </div>
    )
}

export default HandBook;
