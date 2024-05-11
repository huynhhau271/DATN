import { Button, Modal } from "antd";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { diseaseService } from "../services/diseaseService";
import { toast } from "react-toastify";

interface Props {
     diseaseName: string;
     id: number;
     refetch: () => void;
}
const DeleteDiseaseModal = ({ diseaseName, refetch, id }: Props) => {
     const [open, setOpen] = useState(false);

     const showModal = () => {
          setOpen(true);
     };

     const handleCancel = () => {
          setOpen(false);
     };
     const handleOk = () => {
          diseaseService
               .deleteDisease(id)
               .then(() => {
                    refetch();
                    setOpen(false);
                    toast.success(`Xóa Bệnh ${diseaseName} Thành Công`);
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else toast.error(`Xóa Bệnh ${diseaseName} Thất Bại`);
               });
     };
     return (
          <>
               <Button
                    type="primary"
                    onClick={showModal}
                    danger
                    className={`flex  items-center justify-center gap-4`}
               >
                    <span className="mt-1">
                         <MdDeleteForever />
                    </span>
               </Button>
               <Modal
                    title="Xóa Bệnh"
                    open={open}
                    onCancel={handleCancel}
                    onOk={handleOk}
                    width={800}
               >
                    <div className="flex gap-1">
                         <p>Bạn có chắc muốn xóa bệnh</p>
                         <strong>{diseaseName}</strong>
                    </div>
               </Modal>
          </>
     );
};

export default DeleteDiseaseModal;
