import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import "../styles/homeUses.css";
import 'swiper/css/navigation';
import { Swiper as SwiperType } from 'swiper'; 

const newsItems = [
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2022/07/benh-do-phe-cau-khuan.jpg",
        imgAlt: "Phế cầu khuẩn gây bệnh gì? Nguyên nhân, triệu chứng, phòng ngừa",
        title: "Phế cầu khuẩn gây bệnh gì? Nguyên nhân, triệu chứng, phòng ngừa",
        intro: "Phế cầu khuẩn là tác nhân thường được phát hiện trong tình trạng đồng nhiễm, bội nhiễm ở nhiều bệnh nhân Covid-19, COPD, cúm,... Không chỉ gây bệnh..."
    },
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2023/08/bi-cho-can-khong-chich-ngua-co-sao-khong.jpg",
        imgAlt: "Bị chó cắn không chích ngừa có sao không? [Chuyên gia giải đáp]",
        title: "Bị chó cắn không chích ngừa có sao không? [Chuyên gia giải đáp]",
        intro: "Khi bị chó cắn, việc tiêm ngừa là biện pháp cần thiết để phòng ngừa các biến chứng nghiêm trọng. Tuy nhiên, nhiều người vẫn còn tỏ ra lo lắng và thắc..."
    },
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2021/04/viem-mang-nao-nguy-hiem-khong.jpg",
        imgAlt: "Viêm màng não có thể gây tử vong trong 24 giờ nhiễm bệnh",
        title: "Viêm màng não có thể gây tử vong trong 24 giờ nhiễm bệnh",
        intro: "Viêm màng não là bệnh lý thần kinh nguy hiểm, có tỷ lệ tử vong trên 50%. Khoảng 30-50% trẻ sau điều trị có nguy cơ gánh chịu các biến chứng nghiêm..."
    },
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2020/04/viem-mang-nao-mo-cau.jpg",
        imgAlt: "Viêm màng não mô cầu: nguyên nhân, triệu chứng và cách phòng ngừa",
        title: "Viêm màng não mô cầu: nguyên nhân, triệu chứng và cách phòng ngừa",
        intro: "Viêm màng não mô cầu là một bệnh nguy hiểm, diễn tiến rất nhanh. Trẻ em mắc viêm màng não mô cầu có thể tử vong trong vòng 24 giờ đầu nhập viện nếu..."
    },
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2023/12/bi-cho-can-co-phai-tiem-uon-van-khong.jpg",
        imgAlt: "Bị chó cắn có phải tiêm uốn ván không? Cần lưu ý điều gì?",
        title: "Bị chó cắn có phải tiêm uốn ván không? Cần lưu ý điều gì?",
        intro: "Theo thống kê của Bộ Y tế, chỉ tính riêng 9 tháng đầu năm 2023, đã có hàng trăm ngàn ca phơi nhiễm và 64 ca tử vong do bệnh dại. Vật nuôi, chó/mèo..."
    },
    {
        imgSrc: "https://vnvc.vn/wp-content/uploads/2023/03/chich-ngua-cho-can-bao-nhieu-tien.jpg",
        imgAlt: "Chích ngừa chó cắn bao nhiêu tiền? Tiêm ở đâu uy tín, an toàn?",
        title: "Chích ngừa chó cắn bao nhiêu tiền? Tiêm ở đâu uy tín, an toàn?",
        intro: "Chích ngừa chó cắn bao nhiêu tiền? Địa điểm chích ngừa uy tín và an toàn là vấn đề được nhiều người dân quan tâm nhất là đối với loại vắc xin thường..."
    }
];

const PathologyUser = () => {
    const handleSwiper = (swiper: SwiperType) => {
        console.log(swiper);
      };
    return (
        <div className="news-container CategoryUser">
            <h2>Bệnh học</h2>

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

export default PathologyUser;