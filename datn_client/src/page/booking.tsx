import React, { useState } from "react";
import CustomerBookingForm from "../forms/customerBookingForm";
import ConfirmBookingModal from "../modals/confirmBookingModal";
import { useAuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import { ICustomer } from "../models/ICustomer";
import useGetCustomer from "../hook/useGetCustomer";
import { Loading } from "../utils/components/sprin";

const Booking: React.FC = () => {
     const { userLogin } = useAuthContext();
     if (!userLogin) return <Navigate to="/dang-nhap" />;
     const [openModalCofirm, setOpenModalConfirm] = useState(false);
     const { customer, isLoading, refetch } = useGetCustomer();
     return (
          <>
               {isLoading || !customer ? (
                    <div className="h-full">
                         <Loading />
                    </div>
               ) : (
                    <div className="py-10 flex items-center flex-col gap-6 mt-10 w-full">
                         <div className="w-1/2 mr-10 items-start justify-center flex flex-col ml-52">
                              <div className="text-4xl text-left ml-2 w-full text-[#102A83]">
                                   ĐĂNG KÝ TIÊM CHỦNG
                              </div>
                              <div className="ml-2 w-10/12 text-left">
                                   Đăng ký thông tin tiêm chủng để tiết kiệm
                                   thời gian khi đến làm thủ tục tại quầy Lễ tân
                                   cho Quý Khách hàng, việc đăng ký thông tin
                                   tiêm chủng chưa hỗ trợ đặt lịch hẹn chính xác
                                   theo giờ.
                              </div>
                         </div>

                         <CustomerBookingForm
                              customer={customer}
                              refetch={refetch}
                              setOpenModalConfirm={setOpenModalConfirm}
                         />
                    </div>
               )}

               <ConfirmBookingModal
                    email={userLogin.email}
                    open={openModalCofirm}
                    refetch={refetch}
                    name={(userLogin as ICustomer).customerName}
                    dob={(userLogin as ICustomer).customerDoB}
                    setOpen={setOpenModalConfirm}
               />
          </>
     );
};

export default Booking;
