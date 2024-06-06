import { Button, Modal, Select } from "antd";
import { useState } from "react";
import { bookingService } from "../services/bookingService";
import { toast } from "react-toastify";
import { getUserRoleStaff } from "../hook/getUserRoleStaff";

interface Props {
     bookingId: number;
     refetch: () => void;
}
const InjectModal = ({ bookingId, refetch }: Props) => {
     const [open, setOpen] = useState(false);
     const { staffs } = getUserRoleStaff();
     const [nuffId, setNuffId] = useState();
     const handleOk = () => {
          if (!nuffId) toast.error("Vui Lòng Chọn Nhân Viên Tiêm Chủng");
          else
               bookingService
                    .inject(bookingId, nuffId)
                    .then(() => {
                         refetch();
                         setOpen(false);
                         toast.success("Xác Nhận Tiêm Chủng Thành Công");
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
                    className={`flex  items-center justify-center gap-4 !bg-green-500`}
               >
                    Tiêm Chủng
               </Button>
               <Modal
                    title={"Tiêm Chủng"}
                    open={open}
                    onCancel={handleCancel}
                    width={300}
                    okType="primary"
                    onOk={handleOk}
                    okText="Xác Nhận Tiêm"
               >
                    <p>Người Tiêm</p>
                    <Select className="w-full" onChange={setNuffId}>
                         {staffs?.map((staff) => (
                              <Select.Option value={staff.id}>
                                   {staff.fullName}
                              </Select.Option>
                         ))}
                    </Select>
               </Modal>
          </>
     );
};

export default InjectModal;
