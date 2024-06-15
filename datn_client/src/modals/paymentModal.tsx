import { Button, Modal } from "antd";
import { useState } from "react";
import { bookingService } from "../services/bookingService";
import { toast } from "react-toastify";
import { IVaccine } from "../models/vaccine.model";

interface Props {
     bookingId: number;
     refetch: () => void;
     vaccine: IVaccine;
}
const PaymentModal = ({ bookingId, refetch, vaccine }: Props) => {
     const [open, setOpen] = useState(false);
     const handleOk = () => {
          bookingService
               .payment(bookingId)
               .then(() => {
                    refetch();
                    setOpen(false);
                    toast.success("Đã Thanh Toán Thành Công");
               })
               .catch((error) => {
                    if (error.response) {
                         toast.error(error.response.data.message);
                    } else toast.error("Có Lỗi Hệ Thống Vui Lòng Thử Lại");
               });
     };
     const showModal = () => {
          setOpen(true);
     };

     const handleCancel = () => {
          setOpen(false);
     };

     return (
          <>
               <Button
                    type="primary"
                    onClick={showModal}
                    className={`flex items-center justify-center gap-4 `}
               >
                    Thanh Toán
               </Button>
               <Modal
                    title={"Xác Nhận Thanh Toán"}
                    open={open}
                    onCancel={handleCancel}
                    width={300}
                    okType="primary"
                    onOk={handleOk}
                    okText="Thanh Toán"
               >
                    <span className="flex justify-between">
                         <p> Vaccine:</p> <p>{vaccine.vaccineName}</p>
                    </span>
                    <span className="flex  justify-between  ">
                         <p> Số tiền:</p>
                         <p>
                              {vaccine.price.toLocaleString("vi-VN", {
                                   currency: "VND",
                              })}{" "}
                              VNĐ
                         </p>
                    </span>
               </Modal>
          </>
     );
};

export default PaymentModal;
