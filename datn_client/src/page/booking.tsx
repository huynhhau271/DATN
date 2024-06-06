import React, { useState } from "react";
import BookingForm from "../forms/bookingForm";
import CheckCustomerModal from "../modals/checkCustomerModal";
import CustomerBookingForm from "../forms/customerBookingForm";
import ConfirmBookingModal from "../modals/confirmBookingModal";
import GetInfoBookingModal from "../modals/getInfoCustomerModal";
import { ICustomer } from "../models/ICustomer";

const Booking: React.FC = () => {
     const [iscustomer, setIsCustomer] = useState<true | false | undefined>(
          undefined
     );
     const [customer, setCustomer] = useState<ICustomer>({});
     const [openModal, setOpenModal] = useState<boolean>(true);
     const [email, setEmail] = useState<string | undefined>();
     const [name, setName] = useState<string | undefined>();
     const [dob, setDob] = useState<string | undefined | Date>();
     const [openModalCofirm, setOpenModalConfirm] = useState(false);
     const [openGetInfo, setOpenInfo] = useState(false);
     return (
          <>
               <div className="py-10 flex items-center flex-col gap-6 mt-10 w-full">
                    <div className="w-2/4 items-start justify-center flex flex-col">
                         <div className="text-4xl text-left ml-2 w-full text-[#102A83]">
                              ĐĂNG KÝ TIÊM CHỦNG
                         </div>
                         <div className="ml-2 w-10/12 text-left">
                              Đăng ký thông tin tiêm chủng để tiết kiệm thời
                              gian khi đến làm thủ tục tại quầy Lễ tân cho Quý
                              Khách hàng, việc đăng ký thông tin tiêm chủng chưa
                              hỗ trợ đặt lịch hẹn chính xác theo giờ.
                         </div>
                    </div>
                    {iscustomer === undefined || !customer ? (
                         <></>
                    ) : iscustomer ? (
                         <CustomerBookingForm
                              customer={customer}
                              setOpenModalConfirm={setOpenModalConfirm}
                         />
                    ) : (
                         <BookingForm
                              setDob={setDob}
                              setName={setName}
                              setEmail={setEmail}
                              setOpenModalConfirm={setOpenModalConfirm}
                         />
                    )}
               </div>
               <CheckCustomerModal
                    open={openModal}
                    setOpen={setOpenModal}
                    setCustomer={setIsCustomer}
                    setOpenInfo={setOpenInfo}
               />
               <GetInfoBookingModal
                    open={openGetInfo}
                    setOpen={setOpenInfo}
                    setIsCustomer={setIsCustomer}
                    setCustomer={setCustomer}
                    setDob={setDob}
                    setName={setName}
                    setEmail={setEmail}
               />
               <ConfirmBookingModal
                    email={email}
                    open={openModalCofirm}
                    name={name}
                    dob={dob}
                    setOpen={setOpenModalConfirm}
               />
          </>
     );
};

export default Booking;
