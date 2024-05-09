import { Button, Modal } from "antd";
import { useState } from "react";
import { IVaccine } from "../models/vaccine.model";
import VaccineForm from "../forms/vaccineForm";

interface Props {
     title?: string;
     icon: JSX.Element;
     data?: IVaccine;
     refetch: () => void;
}
const VaccineModal = ({ title, icon, refetch, data }: Props) => {
     const [open, setOpen] = useState(false);
     const [confirmLoading, setConfirmLoading] = useState(false);

     const showModal = () => {
          setOpen(true);
     };

     const handleOk = () => {
          setConfirmLoading(true);
          setTimeout(() => {
               setOpen(false);
               setConfirmLoading(false);
          }, 2000);
     };

     const handleCancel = () => {
          setOpen(false);
     };

     return (
          <>
               <Button
                    type="primary"
                    onClick={showModal}
                    className={`flex items-center  gap-4 ${
                         title ? "!mr-5" : ""
                    }`}
                    block
               >
                    <span className="!mr-2">
                         {title || "Cập Nhật Thông Tin Vaccine"}
                    </span>
                    <span className="mt-1">{icon}</span>
               </Button>
               <Modal
                    title={title || "Cập Nhật Thông Tin Nhân Viên"}
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={null}
                    width={700}
               >
                    <VaccineForm
                         setOpen={setOpen}
                         refetch={refetch}
                         data={data}
                    />
               </Modal>
          </>
     );
};

export default VaccineModal;
