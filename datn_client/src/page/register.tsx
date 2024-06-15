import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, Typography } from "antd";
import { formatDate } from "../utils/formatDate";
import moment from "moment";
import { useGetProvince } from "../hook/useGetProvince";
import { IDistrict, IWard } from "../models/province.model";
import { rotations } from "../utils/rotation";
import { customerService } from "../services/customerService";

export default function Register() {
     const navigate = useNavigate();
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

     const { provinces } = useGetProvince();
     // const { vaccines, refetch } = useGetAllVaccineByMothOld(mothOld);
     const [districts, setDistricts] = useState<IDistrict[] | undefined>([]);
     const [wards, setWards] = useState<IWard[] | undefined>([]);
     const [wardId, setWardId] = useState<string>("");
     const [form] = Form.useForm();

     const handleProvinceChange = (value: string) => {
          setDistricts(
               provinces?.find((data) => data.id === value)?.districts ?? []
          );
          form.setFieldValue("district", undefined);
          form.setFieldValue("wardId", undefined);
     };

     const handleDistrictChange = (value: string) => {
          setWards(districts?.find((data) => data.id === value)?.wards ?? []);
     };
     const handleWardChange = (value: string) => {
          setWardId(value);
     };
     const validateDob = (value: string) => {
          const today = moment();
          if (moment(value).isSameOrAfter(today))
               return Promise.reject("Ngày Sinh Không Hợp Lệ");
          else return Promise.resolve();
     };

     const handleSubmit =  (value: any) => {
               delete value.rePassword;
               customerService.create(value).then(() => {
                    form.resetFields();
                    navigate("/dang-nhap");
                    toast.success("Đăng Ký Tài Khoản Khách Hàng Thành Công!");
               }).catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else toast.error("Có lỗi hệ thống vui lòng thử lại");
               });;
     };

     return (
          <>
               <div className="flex justify-center pt-10">
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
                              ĐĂNG KÝ TÀI KHOẢN
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
                                        {
                                             validator: (_, e) =>
                                                  validateDob(e),
                                        },
                                   ]}
                                   className="flex-1"
                              >
                                   <Input
                                        type="date"
                                        defaultValue={formatDate(
                                             moment().toString(),
                                             "yyyy-mm-dd"
                                        )}
                                        max={formatDate(
                                             moment().toString(),
                                             "yyyy-mm-dd"
                                        )}
                                   />
                              </Form.Item>
                         </div>
                         <div className="flex justify-between gap-2 w-full">
                              <Form.Item
                                   label="Giới tính"
                                   name="gender"
                                   className="flex-1"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui Lòng Chọn Giởi Tính Của Trẻ!",
                                        },
                                   ]}
                              >
                                   <Select
                                        placeholder="Giới Tính"
                                        options={[
                                             {
                                                  value: true,
                                                  label: "Nam",
                                             },
                                             {
                                                  value: false,
                                                  label: "Nữ",
                                             },
                                        ]}
                                   />
                              </Form.Item>
                              <Form.Item
                                   className="flex-1"
                                   label="Mã Định Danh"
                                   name="CCCD"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui Lòng Nhập Mã Định Danh!",
                                        },
                                        {
                                             pattern: /^\d{12}$/,
                                             message: "Mã Định Danh Không Hợp Lệ",
                                        },
                                   ]}
                              >
                                   <Input />
                              </Form.Item>
                         </div>

                         <div className="flex w-full justify-between gap-2">
                              <Form.Item
                                   label="Tỉnh thành"
                                   name="province"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui Lòng Chọn Tỉnh Thành!",
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
                                   name="district"
                                   className="flex-1"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui Lòng Chọn Quận Huyện!",
                                        },
                                   ]}
                              >
                                   <Select
                                        disabled={
                                             districts && districts.length > 0
                                                  ? false
                                                  : true
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
                                             message: "Vui Lòng Chọn Xã Phường",
                                        },
                                   ]}
                              >
                                   <Select
                                        defaultValue={wardId}
                                        value={wardId}
                                        disabled={
                                             wards && wards?.length > 0
                                                  ? false
                                                  : true
                                        }
                                        onChange={(value) =>
                                             handleWardChange(value)
                                        }
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
                                   label="Mật khẩu"
                                   name={"password"}
                                   className="flex-1"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui Lòng Nhập mật khẩu",
                                        },
                                   ]}
                              >
                                   <Input.Password
                                        placeholder="Mật khẩu"
                                        value={password}
                                        type="password"
                                        onChange={(e) =>
                                             setPassword(e.target.value)
                                        }
                                   />
                              </Form.Item>
                              <Form.Item
                                   label="Xác nhận mật khẩu"
                                   name={"rePassword"}
                                   className="flex-1"
                                   rules={[
                                        {
                                             required: true,
                                             message: "Vui Lòng xác nhận mật khẩu!",
                                        },
                                        {
                                             validator: (_, e) => {
                                                  if (e != password)
                                                       return Promise.reject(
                                                            "Mật Khẩu Không Trùng Khớp"
                                                       );
                                                  else return Promise.resolve();
                                             },
                                        },
                                   ]}
                              >
                                   <Input.Password
                                        placeholder="********"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                             setConfirmPassword(e.target.value)
                                        }
                                   />
                              </Form.Item>
                         </div>

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
                                             message: "Vui Lòng Chọn Mối Quan Hệ Với Người Tiêm",
                                        },
                                   ]}
                              >
                                   <Select>
                                        {rotations.map((rotation) => (
                                             <Select.Option
                                                  value={rotation.value}
                                             >
                                                  {rotation.lable}
                                             </Select.Option>
                                        ))}
                                   </Select>
                              </Form.Item>
                         </div>

                         <Form.Item>
                              <Button
                                   type="primary"
                                   htmlType="submit"
                                   className="login-form-button"
                              >
                                   Đăng ký tài khoản
                              </Button>
                         </Form.Item>
                    </Form>
               </div>
          </>
     );
}
