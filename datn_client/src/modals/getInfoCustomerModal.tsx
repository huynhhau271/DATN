import { Button, Form, Input, Modal, Typography } from "antd";
import { ICustomer } from "../models/ICustomer";
import { customerService } from "../services/customerService";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import moment from "moment";
import { Dispatch } from "react";
interface IProps {
     setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>;
     setIsCustomer: Dispatch<React.SetStateAction<boolean | undefined>>;
     setOpen: Dispatch<React.SetStateAction<boolean>>;
     open: boolean;
     setDob: Dispatch<React.SetStateAction<string | undefined | Date>>;
     setName: Dispatch<React.SetStateAction<string | undefined>>;
     setEmail: Dispatch<React.SetStateAction<string | undefined>>;
}
const GetInfoBookingModal = ({
     setCustomer,
     setOpen,
     open,
     setEmail,
     setName,
     setDob,
     setIsCustomer,
}: IProps) => {
     const [form] = Form.useForm();

     const handleSubmit = ({ customerName, customerDoB, email }: any) => {
          customerService
               .getCustomerByInfo({
                    email: email,
                    name: customerName,
                    dob: customerDoB,
               })
               .then((response: ICustomer) => {
                    setCustomer(response);
                    setDob(response.customerDoB);
                    setEmail(response.email);
                    setName(response.customerName);
                    setOpen(false);
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else toast.error("Có Lỗi Hệ Thống Vui Lòng Thử Lại");
               });
     };
     return (
          <>
               <Modal open={open} footer={null} width={700}>
                    <Form
                         style={{
                              width: 600,
                         }}
                         form={form}
                         layout="vertical"
                         name="customer"
                         onFinish={handleSubmit}
                         autoComplete="off"
                    >
                         <Typography.Title editable={false} level={5}>
                              Kiểm Tra Thông Tin Khách Hàng
                         </Typography.Title>
                         <div className="flex gap-3">
                              <Form.Item
                                   label="Họ Và Tên Trẻ"
                                   name={"customerName"}
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui Lòng Nhập Tên Của Trẻ!",
                                        },
                                   ]}
                                   className="flex-1"
                              >
                                   <Input />
                              </Form.Item>
                              <Form.Item
                                   label="Ngày sinh"
                                   name="customerDoB"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui Lòng Chọn Ngày Sinh Của Trẻ!",
                                        },
                                   ]}
                                   className="flex-1"
                              >
                                   <Input
                                        type="date"
                                        defaultValue={formatDate(
                                             moment().toString()
                                        )}
                                        max={formatDate(moment().toString())}
                                   />
                              </Form.Item>
                              <Form.Item
                                   label="Email Bố Mẹ"
                                   name="email"
                                   className="flex-1"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui Lòng Nhập Email!",
                                        },
                                        {
                                             type: "email",
                                             message: "Email Không Đúng Định Dạng!",
                                        },
                                   ]}
                              >
                                   <Input />
                              </Form.Item>
                         </div>
                         <Form.Item className="w-full ">
                              <div className="flex justify-center gap-5">
                                   <Button
                                        type="default"
                                        className="login-form-button"
                                        onClick={() => {
                                             setOpen(false);
                                             setIsCustomer(false);
                                        }}
                                   >
                                        Bạn Chưa Sử Dụng Dịch Vụ Tại Trung Tâm
                                   </Button>
                                   <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                   >
                                        Kiểm Tra Thông Tin
                                   </Button>
                              </div>
                         </Form.Item>
                    </Form>
               </Modal>
          </>
     );
};

export default GetInfoBookingModal;
