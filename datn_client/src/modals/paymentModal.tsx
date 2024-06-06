import { Button, Modal } from "antd";
import { useState } from "react";
import { bookingService } from "../services/bookingService";
import { toast } from "react-toastify";

interface Props {
     bookingId: number;
     refetch: () => void;
}
const PaymentModal = ({ bookingId, refetch }: Props) => {
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
                    className={`flex  items-center justify-center gap-4 `}
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
               ></Modal>
          </>
     );
};

export default PaymentModal;
