import React, { useState } from "react";
import { Col, Form, Input, Row, Typography } from "antd";
import { Button, DatePicker, Select } from "antd";

type SizeType = Parameters<typeof Form>[0]["size"];
const Booking: React.FC = () => {
     const [componentSize, setComponentSize] = useState<SizeType | "default">(
          "default"
     );

     const onFormLayoutChange = ({ size }: { size: SizeType }) => {
          setComponentSize(size);
     };
     return (
          <div className="px-20  py-10 flex flex-col font-bold gap-6  ">
               <div className="flex flex-col justify-center">
                    <div className="text-4xl text-[#102A83] ">
                         ĐĂNG KÝ TIÊM CHỦNG
                    </div>
                    <div className="">
                         Đăng ký thông tin tiêm chủng để tiết kiệm thời gian khi
                         đến làm thủ tục tại quầy Lễ tân cho Quý Khách hàng,
                         việc đăng ký thông tin tiêm chủng chưa hỗ trợ đặt lịch
                         hẹn chính xác theo giờ.
                    </div>
               </div>

               <Form
                    name="basic"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                    layout="horizontal"
                    initialValues={{ size: componentSize }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                    style={{ maxWidth: 1200, margin: "0 auto" }}
               >
                    <Typography.Title editable={false} level={5}>
                         THÔNG TIN NGƯỜI TIÊM
                    </Typography.Title>
                    <Row gutter={16}>
                         <Col span={12}>
                              <Form.Item
                                   label="Họ tên người tiêm"
                                   name={"name"}
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Input />
                              </Form.Item>
                         </Col>

                         <Col span={12}>
                              <Form.Item
                                   label="Ngày mong muốn tiêm"
                                   name="DatePicker"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please choose date",
                                        },
                                   ]}
                              >
                                   <DatePicker />
                              </Form.Item>
                         </Col>
                    </Row>
                    <Row gutter={16}>
                         <Col span={12}>
                              <Form.Item
                                   label="Giới tính"
                                   name="gender"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Select>
                                        <Select.Option value="demo">
                                             Name
                                        </Select.Option>
                                        <Select.Option value="demo">
                                             Nữ
                                        </Select.Option>
                                   </Select>
                              </Form.Item>
                         </Col>

                         <Col span={12}>
                              <Form.Item
                                   label="Mã khách hàng PBC( nếu có) "
                                   name="maKhachHang"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Input />
                              </Form.Item>
                         </Col>
                    </Row>

                    <Row gutter={16}>
                         <Col span={8}>
                              <Form.Item
                                   label="Tỉnh thành"
                                   name="tinhthanh"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Select>
                                        <Select.Option value="demo">
                                             DN
                                        </Select.Option>
                                        <Select.Option value="demo">
                                             QN
                                        </Select.Option>
                                   </Select>
                              </Form.Item>
                         </Col>

                         <Col span={8}>
                              <Form.Item
                                   label="Quận Huyện"
                                   name="quanHuyen"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Select>
                                        <Select.Option value="demo">
                                             Name
                                        </Select.Option>
                                        <Select.Option value="demo">
                                             Nữ
                                        </Select.Option>
                                   </Select>
                              </Form.Item>
                         </Col>

                         <Col span={8}>
                              <Form.Item
                                   label="Phường xã"
                                   name="phuongXa"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Select>
                                        <Select.Option value="demo">
                                             Name
                                        </Select.Option>
                                        <Select.Option value="demo">
                                             Nữ
                                        </Select.Option>
                                   </Select>
                              </Form.Item>
                         </Col>
                    </Row>

                    <Row gutter={16}>
                         <Col span={24}>
                              <Form.Item
                                   label="Địa chỉ"
                                   name={"name"}
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Input placeholder="48 Cao Thang" />
                              </Form.Item>
                         </Col>
                    </Row>

                    <Typography.Title editable={false} level={5}>
                         THÔNG TIN LIÊN HỆ
                    </Typography.Title>

                    <Row gutter={16}>
                         <Col span={12}>
                              <Form.Item
                                   label="Họ tên người liên hệ"
                                   name={"nameContact"}
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Input placeholder="Nguyễn Văn A" />
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item
                                   label="Số điện thoại người liên hệ"
                                   name={"name"}
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Input placeholder="0123456789" />
                              </Form.Item>
                         </Col>
                    </Row>

                    <Row gutter={16}>
                         <Col span={12}>
                              <Form.Item
                                   label="Mối quan hệ với người tiêm"
                                   name="relation"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Select>
                                        <Select.Option value="demo">
                                             Bố
                                        </Select.Option>
                                   </Select>
                              </Form.Item>
                         </Col>
                    </Row>

                    <Typography.Title editable={false} level={5}>
                         THÔNG TIN DỊCH VỤ
                    </Typography.Title>
                    <Row gutter={16}>
                         <Col span={12}>
                              <Form.Item
                                   label="Mũi, gói tiêm"
                                   name="relation"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please input!",
                                        },
                                   ]}
                              >
                                   <Input placeholder="Mũi tiêm vắc xin 6in1" />
                              </Form.Item>
                         </Col>

                         <Col span={12}>
                              <Form.Item
                                   label="Ngày mong muốn tiêm"
                                   name="date"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Please choose date",
                                        },
                                   ]}
                              >
                                   <DatePicker />
                              </Form.Item>
                         </Col>
                    </Row>

                    <Form.Item>
                         <Button type="primary">Đăng ký tiêm</Button>
                    </Form.Item>
               </Form>
          </div>
     );
};

export default Booking;
