import { Button, Modal } from "antd";
import { useState } from "react";
import HealtCheckForm from "../forms/healtCheckForm";
import { formatDate } from "../utils/formatDate";

interface Props {
     idBooking: number;
     refetch: () => void;
     fullName: string;
     dob: string | Date;
     gender: boolean;
}
const HealtCheckModal = ({
     refetch,
     idBooking,
     dob,
     fullName,
     gender,
}: Props) => {
     const [open, setOpen] = useState(false);

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
                    className="!bg-yellow-500 flex items-center"
               >
                    Kiểm Tra Sức Khỏe Trước Tiêm
               </Button>
               <Modal
                    title="Kiểm Tra Sức Khỏe Trước Tiêm"
                    open={open}
                    onCancel={handleCancel}
                    footer={null}
                    width={850}
               >
                    <div className="flex justify-between">
                         <span className="flex gap-3">
                              <strong>Họ và tên trẻ:</strong>
                              <p>{fullName}</p>
                         </span>
                         <span className="flex gap-3">
                              <strong>Ngày sinh:</strong>
                              <p>{formatDate(dob)}</p>
                         </span>
                         <span className="flex gap-3">
                              <strong>Giới tính:</strong>
                              <p>{gender ? "Nam" : "Nữ"}</p>
                         </span>
                         <span className="flex gap-3">
                              <strong>Ngày Tiêm</strong>
                              <p>{formatDate()}</p>
                         </span>
                    </div>
                    <hr />
                    <HealtCheckForm
                         setOpen={setOpen}
                         refetch={refetch}
                         bookingId={idBooking}
                    />
               </Modal>
          </>
     );
};

export default HealtCheckModal;
