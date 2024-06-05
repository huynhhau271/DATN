import React from 'react'
import "../styles/VaccinationSchedule.css"


const VaccinationSchedule = () => {
  return (
    <div>
      <div className='VaccinationSchedule'>
        <div className='vc_img'>
          <img src="https://vnvc.vn/wp-content/uploads/2017/06/dc-cnang.jpg" alt="" />
        </div>
        <p className="home">
          <a href="/trang-chu">Trang chủ</a>
          <span className="separator"> » </span>
          <span className="last">LỊCH TIÊM VACXIN</span>
        </p>
        <div>
          <div className="title">
            <h1 className="gt-title">LỊCH TIÊM VACXIN</h1>
          </div>
        </div>
        <hr />
      </div>
      <div className="vaccination-schedule">
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>Tuổi/Vaccine</th>
              <th colSpan={10}>Tháng</th>
              <th colSpan={4}>Tuổi</th>
            </tr>
            <tr>
              <th>Sơ sinh</th>
              <th>2 Tháng</th>
              <th>3 Tháng</th>
              <th>4 Tháng</th>
              <th>6 Tháng</th>
              <th>7 Tháng</th>
              <th>9 Tháng</th>
              <th>12 Tháng</th>
              <th>18 Tháng</th>
              <th>2 Tuổi</th>
              <th>3-4 Tuổi</th>
              <th>5-6 Tuổi</th>
              <th>7-8 Tuổi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lao</td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Viêm gan B</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Bạch hầu, ho gà, uốn ván</td>
              <td></td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>X</td>
              <td></td>
              <td></td>
              <td>X</td>
              <td></td>
            </tr>
            <tr>
              <td>Viêm phổi, viêm màng não mủ do Hib</td>
              <td></td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Tiêu chảy do Rota Virus</td>
              <td></td>
              <td colSpan={4}>Phác đồ 2 hoặc 3 liều, mỗi liều cách nhau tối thiểu 1 tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Viêm phổi, viêm màng não, viêm tai giữa do phế cầu khuẩn</td>
              <td></td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cúm</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={11}>Phác đồ tiêm 2 liều cách nhau tối thiểu 1 tháng cho lần tiêm đầu tiên.
                Tiêm nhắc lại 1 liều/ năm.</td>
            </tr>
            <tr>
              <td>Sởi</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Viêm màng não, nhiễm khuẩn huyết, viêm phổi do não mô cầu khuẩn A,C,W,Y</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>X</td>
              <td></td>
              <td>X</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Vắc xin phòng viêm não Nhật Bản sống giảm độc lực tái tổ hợp</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={5}>Phác đồ 2 liều cách nhau 1 năm</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Vắc xin phòng viêm não Nhật Bản bất hoạt</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={6}>Phác đồ 3 liều tiêm và các liều nhắc lại</td>
            </tr>
            <tr>
              <td>Sởi, Quai bị, Rubella</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>X</td>
              <td></td>
              <td>X</td>
              <td></td>
              <td>X (khuyến cáo)</td>
              <td></td>
            </tr>
            <tr>
              <td>Thủy đậu</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={8}>Phác đồ 2 liều tiêm cách nhau tối thiểu 3 tháng</td>
            </tr>
            <tr>
              <td>Viêm gan A</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Phác đồ 2 liều tiêm cách nhau tối thiểu 6 tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Viêm gan A + B</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Phác đồ 2 liều tiêm cách nhau tối thiểu 6 tháng</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Thương hàn</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={8}>	1 liều, tiêm nhắc mỗi 3 năm</td>
            </tr>
            <tr>
              <td>Bệnh tả</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={8}>Uống 2 liều cách nhau tối thiểu 2 tuần</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VaccinationSchedule