import { Button, Form, Modal, Typography } from "antd";
interface Props {
     setOpen: (value: boolean) => void;
     open: boolean;
     setCustomer: (vl: boolean) => void;
     setOpenInfo: (vl: boolean) => void;
}
const CheckCustomerModal = ({
     setOpen,
     open,
     setCustomer,
     setOpenInfo,
}: Props) => {
     const { Title } = Typography;
     return (
          <>
               <Modal open={open} footer={null}>
                    <div className="flex flex-col items-center">
                         <Title level={5}>
                              Bạn Đã Sử Dụng Dịch Vụ Tại Trung Tâm Chúng Tôi
                              Chưa?
                         </Title>
                         <div className="flex gap-5 mt-4">
                              <Button
                                   type="default"
                                   onClick={() => {
                                        setOpen(false);
                                        setOpenInfo(true);
                                        setCustomer(true);
                                   }}
                              >
                                   Rồi
                              </Button>
                              <Button
                                   type="primary"
                                   onClick={() => {
                                        setCustomer(false);
                                        setOpen(false);
                                   }}
                              >
                                   Chưa
                              </Button>
                         </div>
                    </div>
               </Modal>
          </>
     );
};

export default CheckCustomerModal;
