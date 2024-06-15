import { Button, Modal } from "antd";
import { useState } from "react";
import { FaUserGear } from "react-icons/fa6";
import ChangeCustomerInfoForm from "../forms/changInforCustomerForm";
interface Props {
     idCus: number;
     refetch: any;
}
const ChangeCustomerInfoModal = ({ idCus, refetch }: Props) => {
     const [open, setOpen] = useState(false);
     console.log({});

     return (
          <>
               <Button
                    type="primary"
                    onClick={() => setOpen(true)}
                    block
                    className={`flex  items-center justify-center gap-4 !mr-5 flex-1`}
               >
                    <span className="mt-1">{<FaUserGear />}</span>
               </Button>
               <Modal
                    title={"Cập Nhật Thông Tin Khách Hàng"}
                    open={open}
                    onCancel={() => setOpen(false)}
                    footer={null}
                    width={800}
               >
                    <ChangeCustomerInfoForm
                         idCus={idCus}
                         refetchBooking={refetch}
                    />
               </Modal>
          </>
     );
};

export default ChangeCustomerInfoModal;
