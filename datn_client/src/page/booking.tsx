import React from "react";
import BookingForm from "../forms/bookingForm";

const Booking: React.FC = () => {
     return (
          <div className="py-10 flex items-center flex-col gap-6  w-full">
               <div className="w-2/4 items-start justify-center flex flex-col">
                    <div className="text-4xl text-left ml-2 w-full text-[#102A83]">
                         ĐĂNG KÝ TIÊM CHỦNG
                    </div>
                    <div className="ml-2 w-10/12 text-left">
                         Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi
                         đến làm thủ tục tại quầy Lễ tân cho Quý Khách hàng,
                         việc đăng ký thông tin tiêm chủng chưa hỗ trợ đặt lịch
                         hẹn chính xác theo giờ.
                    </div>
               </div>
               <BookingForm />
          </div>
     );
};

export default Booking;
