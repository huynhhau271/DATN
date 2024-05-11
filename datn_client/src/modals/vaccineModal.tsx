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
                    className={`flex  items-center justify-center gap-4 ${
                         title ? "!mr-5" : ""
                    }`}
               >
                    {title && <span className="!mr-2">{title}</span>}
                    <span className="mt-1">{icon}</span>
               </Button>
               <Modal
                    title={title || "Cập Nhật Thông Tin Vaccine"}
                    open={open}
                    onCancel={handleCancel}
                    footer={null}
                    width={800}
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
