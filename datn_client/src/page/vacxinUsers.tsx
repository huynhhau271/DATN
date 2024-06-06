import "../styles/VacxinUsers.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const VacxinUsers = () => {
    return (
        <div>
            <div>
                <p className="home">
                    <a href="/trang-chu">Trang chủ</a>
                    <span className="separator"> » </span>
                    <span className="last">TIÊM CHỦNG</span>
                </p>
                <div>
                    <div className="title">
                        <h1 className="gt-title">TIÊM CHỦNG TRẺ EM </h1>
                    </div>
                </div>
                <hr />
            </div>
            <div className="title">
                <p>
                    Từ khi có vắc xin, Việt Nam đã bảo vệ hơn 1.6 triệu trẻ em khỏi gần 30 bệnh lý truyền nhiễm có thể gây tử vong; thanh toán thủy đậu từ năm 1979; thanh toán bại liệt từ năm 2000; thanh toán uốn ván sơ sinh từ năm 2005; tiết kiệm hàng ngàn tỷ đồng mỗi năm cho các chi phí chăm sóc y tế… Chúng ta hoàn toàn có thể làm giảm tỷ lệ mắc bệnh, giảm biến chứng, giảm tử vong ở trẻ em dưới 5 tuổi do một số bệnh truyền nhiễm nguy hiểm gây ra nhờ chủng ngừa. Hãy chủ động tiêm vắc xin để con yêu lớn lên an toàn và khỏe mạnh!
                </p>
            </div>
            <div className="product-container">
                <div className="product-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://vnvc.vn/wp-content/uploads/2020/04/1-1.jpg" />
                        <Card.Body>
                            <Card.Title>Lịch tiêm chủng cho trẻ em</Card.Title>
                            <Card.Text>
                                Cập nhật mới và đầy đủ nhất lịch tiêm chủng cho trẻ em, đảm bảo bé yêu được chủng ngừa sớm, đầy đủ, đúng lịch, bảo vệ bé trước nhiều bệnh truyền nhiễm nguy hiểm.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="product-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://vnvc.vn/wp-content/uploads/2020/04/2-1.jpg" />
                        <Card.Body>
                            <Card.Title>Những điều cần biết trước khi tiêm</Card.Title>
                            <Card.Text>
                                Những điều cần biết trước khi tiêm giúp bác sĩ phát hiện bất thường, tạm hoãn tiêm hoặc không tiêm một loại vắc xin nào đó, đảm bảo an toàn cho trẻ khi đi tiêm chủng.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="product-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://vnvc.vn/wp-content/uploads/2020/04/3-1.jpg" />
                        <Card.Body>
                            <Card.Title>Những điều cần biết sau khi tiêm</Card.Title>
                            <Card.Text>
                                Hướng dẫn chi tiết những điều cần biết sau khi tiêm chủng, những phương pháp giúp phụ huynh theo dõi và chăm sóc trẻ sau tiêm, đảm bảo an toàn tiêm chủng cho trẻ.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="product-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://vnvc.vn/wp-content/uploads/2020/04/4-1.jpg" />
                        <Card.Body>
                            <Card.Title>Các loại vắc xin cho trẻ em</Card.Title>
                            <Card.Text>
                                VNVC có đủ các loại vắc xin cho trẻ em, được nhập khẩu từ nước ngoài của các hãng sản xuất uy tín, nổi tiếng Thế giới, và số ít các vắc xin được sản xuất tại Việt Nam.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="product-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://vnvc.vn/wp-content/uploads/2020/04/5-1.jpg" />
                        <Card.Body>
                            <Card.Title>Gói vắc xin cho trẻ em</Card.Title>
                            <Card.Text>
                                Gói vắc xin cho trẻ em đảm bảo có đầy đủ những loại vắc xin đã cam kết trong gói - ngay cả khi tình trạng khan hiếm vắc xin xảy ra, cùng nhiều quyền lợi đặc biệt khác.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="product-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://vnvc.vn/wp-content/uploads/2020/04/6-1.jpg" />
                        <Card.Body>
                            <Card.Title>Gói vắc xin cho trẻ tiền học đường</Card.Title>
                            <Card.Text>
                                Gói vắc xin cho trẻ tiền học đường giúp bố mẹ chủ động phòng ngừa nhiều bệnh truyền nhiễm nguy hiểm cho trẻ, giúp trẻ được bảo vệ tối đa và phát triển toàn diện.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="product-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://vnvc.vn/wp-content/uploads/2020/04/7-1.jpg" />
                        <Card.Body>
                            <Card.Title>Quy trình tiêm chủng tại VNVC</Card.Title>
                            <Card.Text>
                                Quy trình tiêm chủng tại VNVC khoa học, khép kín gồm 5 bước, giúp khách hàng tiêm chủng an toàn, thuận tiện, nhanh chóng, tiết kiệm thời gian, không lo chờ đợi.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className="product-card">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://vnvc.vn/wp-content/uploads/2020/04/8-1.jpg" />
                        <Card.Body>
                            <Card.Title>Bảng giá vắc xin</Card.Title>
                            <Card.Text>
                                Cập nhật bảng giá vắc xin mới và đầy đủ nhất tại Hệ thống trung tâm tiêm chủng VNVC, giá vắc xin cạnh tranh, cam kết bình ổn giá ngay trong thời điểm khan hiếm.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

            </div>

        </div>
    )
}

export default VacxinUsers