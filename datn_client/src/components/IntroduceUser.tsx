import React from 'react'
import "../styles/homeUses.css";

const IntroduceUser = () => {
  return (
    <div className='IntroduceUser'>
        <div className='d-flex child1'>
            <div >
                <div>
                    <h2>Giới thiệu</h2>
                </div>
                <p>Hệ thống tiêm chủng VNVC (thuộc Công ty Cổ phần Vacxin Việt Nam) chính thức đi vào hoạt động từ tháng 6 năm 2017. Trong bối cảnh thế giới đang phải đương đầu với tình trạng biến đổi phức tạp của các chủng vi khuẩn gây bệnh cũng như sự thiếu hụt vắc xin tại Việt Nam như hiện nay, Hệ thống tiêm chủng VNVC ra đời nhằm cung cấp cho trẻ em Việt Nam những loại vắc xin có chất lượng tốt nhất cùng với hệ thống phòng tiêm chủng an toàn, hiện đại và cao cấp.
Với những mục tiêu đó, Công ty VNVC đã xây dựng dây chuyền bảo quản lạnh (Cold chain) đạt tiêu chuẩn GSP …</p>
                <p className='see_more'>Xem thêm</p>
            </div>
            <div>
                <img src="https://vnvc.vn/img/video.jpg" alt="" />
            </div>
        </div>
    </div>
  )
}

export default IntroduceUser