import { Button, Modal } from "antd";
import { useState } from "react";
import HealtCheckForm from "../forms/healtCheckForm";
import { formatDate } from "../utils/formatDate";
import { FaUserDoctor } from "react-icons/fa6";

interface Props {
     idBooking: number;
     refetch: () => void;
     fullName?: string;
     dob?: string | Date;
     gender?: boolean;
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
                    block
                    className={`flex  items-center justify-center gap-4  flex-1 !bg-yellow-500`}
               >
                    <FaUserDoctor />
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
