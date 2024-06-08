import { Button, Form, Input, Typography } from "antd";
import moment from "moment";
import { formatDate } from "../utils/formatDate";
import { customerService } from "../services/customerService";
import { useState } from "react";
import { TrackingBook } from "../utils/components/trackingBook";
import { toast } from "react-toastify";
import { ICustomer } from "../models/ICustomer";

export const TrackingPage = () => {
     const [form] = Form.useForm();
     const [tracking, setTracking] = useState<ICustomer | undefined>(undefined);
     const handleSubmit = ({ fullName, dob, email }: any) => {
          customerService
               .getCustomerTracking({ email, fullName, dob })
               .then((res) => setTracking(res))
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else toast.error("Có Lỗi Hệ Thống Vui Lòng Thử Lại");
               });
     };
     return (
          <>
               <div className="w-full flex justify-center mt-6 flex-col items-center">
                    <Form
                         style={{
                              width: 600,
                         }}
                         form={form}
                         layout="vertical"
                         name="customer"
                         onFinish={handleSubmit}
                    >
                         <Typography.Title editable={false} level={5}>
                              Kiểm Tra Thông Tin Khách Hàng
                         </Typography.Title>
                         <div className="flex gap-3">
                              <Form.Item
                                   label="Họ Và Tên Trẻ"
                                   name={"fullName"}
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
                                   name="dob"
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
                              <Button
                                   type="primary"
                                   htmlType="submit"
                                   className="login-form-button"
                              >
                                   Kiểm Tra Thông Tin
                              </Button>
                         </Form.Item>
                    </Form>

                    <div className="h-full w-full flex justify-center">
                         {tracking && <TrackingBook tracking={tracking} />}
                    </div>
               </div>
          </>
     );
};
