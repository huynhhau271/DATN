import { Button, Form, Modal, Typography } from "antd";
import { InputOTP } from "antd-input-otp";
import { bookingService } from "../services/bookingService";
import { toast } from "react-toastify";
interface Props {
     email: string;
     name: string;
     dob: string;
     setOpen: (value: boolean) => void;
     open: boolean;
}
const ConfirmBookingModal = ({
     email,
     setOpen,
     open = false,
     name,
     dob,
}: Props) => {
     const { Title } = Typography;
     const [form] = Form.useForm();

     const handleFinish = (value: any) => {
          const otp = value["otp"].map((vl: string) => vl).join("");
          bookingService
               .Confirm({ email, name, otp, dob })
               .then(() => {
                    toast.success("Xác Nhận Thông Tin Thành Công");
                    setOpen(false);
                    form.resetFields();
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else toast.error("Xác Nhận Thông Tin Thất Bại");
               });
     };
     return (
          <>
               <Modal
                    title={"Xác Nhận Tiêm Chủng"}
                    open={open}
                    footer={null}
                    width={800}
               >
                    <div className="flex flex-col items-center">
                         <Title level={5}>Vui Lòng Nhập Mã Xác Nhận</Title>
                         <Form onFinish={handleFinish} form={form}>
                              <Form.Item name="otp">
                                   <InputOTP
                                        autoSubmit={form}
                                        inputType="numeric"
                                        length={6}
                                   />
                              </Form.Item>
                         </Form>
                    </div>
               </Modal>
          </>
     );
};

export default ConfirmBookingModal;
