import { Button, Modal } from "antd";
import { useState } from "react";
import DiseaseForm from "../forms/diseaseForm";
import { IDisease } from "../models/disease.model";

interface Props {
     title?: string;
     icon: JSX.Element;
     data?: IDisease;
     refetch: () => void;
}
const DiseaseModal = ({ title, icon, refetch, data }: Props) => {
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
                    title={title || "Cập Nhật Thông Tin Bệnh"}
                    open={open}
                    onCancel={handleCancel}
                    footer={null}
                    width={800}
               >
                    <DiseaseForm
                         setOpen={setOpen}
                         refetch={refetch}
                         data={data}
                    />
               </Modal>
          </>
     );
};

export default DiseaseModal;
