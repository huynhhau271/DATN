import React from "react";
import BookingForm from "../forms/bookingForm";

const Booking: React.FC = () => {
     return (
          <div className="py-10 flex items-center flex-col gap-6 mt-10 w-full justify-center">
               <div className="items-start justify-center pink flex flex-col flex-1 w-4/12 mr-2">
                    <div className="text-4xl  ml-2 text-[#102A83] text-left">
                         ĐĂNG KÝ TIÊM CHỦNG
                    </div>
                    <div className="ml-1 w-12/12 text-left">
                         Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi
                         đến làm thủ tục tại quầy Lễ tân cho Quý Khách hàng,
                         việc đăng ký thông tin tiêm chủng chưa hỗ trợ đặt lịch
                         hẹn chính xác theo giờ.
                    </div>
               </div>
              <div className="flex-1">
              <BookingForm />
              </div>
          </div>
     );
};

export default Booking;
