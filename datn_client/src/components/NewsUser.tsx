import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import "../styles/homeUses.css";
import 'swiper/css/navigation';
import { Swiper as SwiperType } from 'swiper'; 

const newsItems = [
    {
        imgSrc: "../../public/User_Image/LichTiemChungChoTreTu0Den5Tuoi.png",
        imgAlt: "Lịch tiêm chủng cho trẻ từ 0 đến 5 tuổi",
        title: "Lịch tiêm chủng cho trẻ từ 0 đến 5 tuổi theo Bộ Y Tế",
        intro: "Bố mẹ cần cho trẻ em tiêm vắc xin theo lịch tiêm chủng cho trẻ từ 0 đến 5 tuổi do Bộ Y tế khuyến cáo để ngăn chặn các bệnh truyền nhiễm nguy hiểm, trẻ..."
    },
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2024/05/mien-dich-nhan-tao-la-gi.jpg",
        imgAlt: "Miễn dịch nhân tạo là gì?",
        title: "Miễn dịch nhân tạo là gì? Vai trò và cách kích hoạt nó",
        intro: "Cùng với miễn dịch tự nhiên, miễn dịch nhân tạo là lá chắn quan trọng giúp cơ thể chống lại mầm bệnh. Miễn dịch nhân tạo được xây dựng thông qua việc..."
    },
    {
        imgSrc: "../../public/User_Image/MienDichTuNhien.png",
        imgAlt: "Miễn dịch tự nhiên là gì? Cách để tăng cường hệ miễn dịch",
        title: "Miễn dịch tự nhiên là gì? Vai trò quan trọng và cách để tăng cường",
        intro: "Miễn dịch tự nhiên là hàng rào đầu tiên của cơ thể ngăn chặn không cho các loại virus, vi khuẩn, vi sinh vật xâm nhập và tấn công, trong khi đó miễn..."
    },
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2024/05/tong-ket-livestream-tiem-hpv.jpg",
        imgAlt: "Tăng cao nhu cầu tiêm HPV",
        title: "Tăng cao nhu cầu tiêm HPV ở người lớn từ 27-45 tại VNVC",
        intro: "Thông kê của Tổ Chức Y Tế (WHO), cứ 3 nam giới trên 15 tuổi thì có 1 người nhiễm ít nhất 1 chủng HPV; và cứ 5 người ở tất cả độ tuổi thì có 1..."
    },
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2024/05/me-nhiem-hpv-co-nen-cho-con-bu.jpg",
        imgAlt: "Mẹ bị nhiễm virus HPV",
        title: "Mẹ bị nhiễm virus HPV có nên cho con bú không?",
        intro: "Sữa mẹ là nguồn dinh dưỡng tốt nhất và rất cần thiết cho trẻ sơ sinh và trẻ nhỏ để trẻ khỏe mạnh và phát triển toàn diện. Nhưng nếu mẹ bị nhiễm HPV có..."
    },
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2024/05/phu-nu-da-sinh-con-co-tiem-duoc-hpv-khong.jpg",
        imgAlt: "Phụ nữ đã sinh con tiêm HPV",
        title: "Phụ nữ đã sinh con tiêm HPV có hiệu quả không?",
        intro: "Bộ Y tế đã mở rộng chỉ định tiêm vắc xin HPV cho nam và nữ từ 9-45 tuổi, vậy phụ nữ đã sinh con, đã có gia đình tiêm vắc xin HPV theo chỉ định mới..."
    }
];

const NewsUser = () => {
    const handleSwiper = (swiper: SwiperType) => {
        console.log(swiper);
      };
    return (
        <div className="news-container CategoryUser">
            <h2>Tin tức</h2>

            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={handleSwiper} 
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false, 
                }}
            >
                {newsItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="news-item">
                            <a>
                                <img src={item.imgSrc} alt={item.imgAlt} />
                                <h3>{item.title}</h3>
                                <p>{item.intro}</p>
                            </a>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default NewsUser;