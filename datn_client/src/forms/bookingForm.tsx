import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
import { useGetProvince } from "../hook/useGetProvince";
import { useEffect, useState } from "react";
import { IDistrict, IWard } from "../models/province.model";
import { ICustomer } from "../models/ICustomer";
import useGetAllVaccineByMothOld from "../hook/useGetAllVaccineByMoth";
import dayjs from "dayjs";

function BookingForm() {
     const [mothOld, setMothOld] = useState(0);
     const { provinces } = useGetProvince();
     const { vaccines, refetch } = useGetAllVaccineByMothOld(mothOld);
     const [districts, setDistricts] = useState<IDistrict[]>([]);
     const [wards, setWards] = useState<IWard[]>([]);
     const [wardId, setWardId] = useState<string>("");
     // const isEdit = data !== undefined;
     const [form] = Form.useForm<ICustomer>();
     const handleProvinceChange = (value: string) => {
          setDistricts(
               provinces?.find((data) => data.id === value)?.districts ?? []
          );
     };

     const handleDistrictChange = (value: string) => {
          setWards(districts?.find((data) => data.id === value)?.wards ?? []);
     };
     const handleWardChange = (value: string) => {
          setWardId(value);
     };
     // const onReset = () => {
     //      form.resetFields();
     // };
     const handleSubmit = (value: ICustomer) => {
          console.log(value);
     };
     useEffect(() => {
          refetch();
     }, [mothOld, refetch]);
     return (
          <>
               <Form
                    style={{
                         width: 600,
                    }}
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
               >
                    <Typography.Title editable={false} level={5}>
                         THÔNG TIN NGƯỜI TIÊM
                    </Typography.Title>
                    <div className="flex justify-between gap-2 w-full">
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
                              <DatePicker
                                   className="w-full"
                                   onChange={(value) => {
                                        const now = dayjs();
                                        const monthsDifference = now.diff(
                                             value,
                                             "month",
                                             true
                                        );
                                        setMothOld(monthsDifference);
                                   }}
                              />
                         </Form.Item>
                    </div>
                    <div className="flex justify-between gap-5 w-1/2">
                         <Form.Item
                              label="Giới tính"
                              name="gender"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Chọn Giởi Tính Của Trẻ!",
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Select>
                                   <Select.Option value={true}>
                                        Nam
                                   </Select.Option>
                                   <Select.Option value={false}>
                                        Nữ
                                   </Select.Option>
                              </Select>
                         </Form.Item>
                    </div>

                    <div className="flex w-full justify-between gap-2">
                         <Form.Item
                              label="Tỉnh thành"
                              name="tinhthanh"
                              rules={[
                                   {
                                        required: true,
                                        message: "Please input!",
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Select
                                   onChange={(value) =>
                                        handleProvinceChange(value)
                                   }
                                   options={
                                        provinces &&
                                        provinces.map((province) => ({
                                             key: province.id,
                                             label: province.name,
                                             value: province.id,
                                        }))
                                   }
                              />
                         </Form.Item>

                         <Form.Item
                              label="Quận Huyện"
                              name="quanHuyen"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Please input!",
                                   },
                              ]}
                         >
                              <Select
                                   disabled={
                                        districts.length > 0 ? false : true
                                   }
                                   onChange={(value) =>
                                        handleDistrictChange(value)
                                   }
                                   options={
                                        districts &&
                                        districts.map((district) => ({
                                             key: district.id,
                                             label: district.name,
                                             value: district.id,
                                        }))
                                   }
                              />
                         </Form.Item>

                         <Form.Item
                              label="Phường xã"
                              className="flex-1"
                              name="wardId"
                              rules={[
                                   {
                                        required: true,
                                        message: "Please input!",
                                   },
                              ]}
                         >
                              <Select
                                   defaultValue={wardId}
                                   value={wardId}
                                   disabled={wards?.length > 0 ? false : true}
                                   onChange={(value) => handleWardChange(value)}
                                   options={
                                        wards &&
                                        wards.map((ward) => ({
                                             key: ward.id,
                                             label: ward.name,
                                             value: ward.id,
                                        }))
                                   }
                              />
                         </Form.Item>
                    </div>

                    <div className="flex justify-start w-full">
                         <Form.Item
                              label="Địa chỉ"
                              name={"address"}
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Địa Chỉ!",
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Input />
                         </Form.Item>
                    </div>

                    <Typography.Title editable={false} level={5}>
                         THÔNG TIN PHỤ HUYNH HOẶC NGƯỜI GIÁM HỘ
                    </Typography.Title>

                    <div className="flex w-full justify-between gap-2">
                         <Form.Item
                              label="Họ tên"
                              name={"parentsName"}
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Họ Tên Phụ Huynh Hoặc Người Giám Hộ",
                                   },
                              ]}
                         >
                              <Input placeholder="Nguyễn Văn A" />
                         </Form.Item>
                         <Form.Item
                              label="Số điện thoại liên hệ"
                              name={"phone"}
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Số Điện Thoại Liên Hệ!",
                                   },
                                   {
                                        pattern: /^\d{10}$/,
                                        message: "Số Điện Thoại Không Hợp Lệ",
                                   },
                              ]}
                         >
                              <Input placeholder="0123456789" />
                         </Form.Item>
                    </div>

                    <div className="flex justify-between w-full gap-2 ">
                         <Form.Item
                              label="Email"
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
                         <Form.Item
                              label="Mối quan hệ với người tiêm"
                              name="relation"
                              className="flex-1"
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
                    </div>

                    <Typography.Title editable={false} level={5}>
                         THÔNG TIN DỊCH VỤ
                    </Typography.Title>
                    <div className="flex w-full justify-between gap-2">
                         <Form.Item
                              label="Vaccine"
                              name="relation"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Please input!",
                                   },
                              ]}
                         >
                              <Select>
                                   {vaccines?.map((vaccine) => {
                                        return (
                                             <Select.Option value={vaccine.id}>
                                                  {vaccine.vaccineName}
                                             </Select.Option>
                                        );
                                   })}
                              </Select>
                         </Form.Item>

                         <Form.Item
                              label="Ngày mong muốn tiêm"
                              name="date"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Please choose date",
                                   },
                              ]}
                         >
                              <DatePicker className="w-full" />
                         </Form.Item>
                    </div>

                    <Form.Item>
                         <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                         >
                              Đăng ký tiêm
                         </Button>
                    </Form.Item>
               </Form>
          </>
     );
}

export default BookingForm;
