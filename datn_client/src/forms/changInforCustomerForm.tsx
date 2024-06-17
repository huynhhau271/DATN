import { Button, Form, Input, Select, Typography } from "antd";
import { useGetProvince } from "../hook/useGetProvince";
import { useEffect, useState } from "react";
import { IDistrict, IProvince, IWard } from "../models/province.model";
import moment from "moment";
import { formatDate } from "../utils/formatDate";
import { retations } from "../utils/retation";
import useGetCustomerById from "../hook/getCustomerById";
import { ICustomer } from "../models/ICustomer";
import { customerService } from "../services/customerService";
import { toast } from "react-toastify";
import { Loading } from "../utils/components/sprin";
import { on } from "events";

interface IProps {
     idCus: number;
     isBooking?: boolean;
     setOpen?: any;
}

function ChangecustomerForm({ idCus, setOpen, isBooking = false }: IProps) {
     const { customer, isLoading } = useGetCustomerById(idCus);
     const { provinces: provinceData } = useGetProvince();
     const [provinces, setProvinces] = useState<IProvince[] | undefined>([]);
     const [provinceId, setProvinceId] = useState<string | undefined>("");
     const [districts, setDistricts] = useState<IDistrict[]>([]);
     const [districtId, setDistrictId] = useState<string | null>();
     const [wards, setWards] = useState<IWard[] | undefined>([]);
     const [wardId, setWardId] = useState<string | undefined>();
     const [form] = Form.useForm<ICustomer>();

     const handleProvinceChange = (value: string) => {
          setProvinceId(value);
          setDistrictId(null);
          setWardId(undefined);
          setDistricts(
               provinceData?.find((data) => data.id === value)?.districts ?? []
          );
     };

     const handleDistrictChange = (value: string) => {
          setDistrictId(value);
          setWards(districts?.find((data) => data.id === value)?.wards ?? []);
     };
     const handleWardChange = (value: string) => {
          setWardId(value);
     };

     useEffect(() => {
          form.resetFields();
     }, [customer, form]);
     useEffect(() => {
          setProvinces(provinceData);
          if (customer?.provinceId) setProvinceId(customer?.provinceId);
     }, [provinceData, customer?.provinceId]);

     useEffect(() => {
          if (customer?.districtId) setDistrictId(customer?.districtId);
          setDistricts(
               provinces?.find((provice) => provice.id === provinceId)
                    ?.districts as IDistrict[]
          );
     }, [provinceId, provinces, customer?.districtId]);

     useEffect(() => {
          if (customer?.wardId) setWardId(customer?.wardId);
          setWards(
               districts?.find((district) => district.id === districtId)
                    ?.wards as IWard[]
          );
     }, [districts, districtId, customer?.wardId]);

     const validateDob = (value: string) => {
          const today = moment();
          if (moment(value).isSameOrAfter(today))
               return Promise.reject("Ngày Sinh Không Hợp Lệ");
          else return Promise.resolve();
     };
     const handleSubmit = (value: ICustomer) => {
          customerService.updateCustomer({ ...value, id: idCus }).then(() => {
               toast.success("success");
               setOpen(false);
          });
     };

     return (
          <>
               {isLoading ? (
                    <Loading />
               ) : (
                    <div className="flex w-full justify-center">
                         <Form
                              initialValues={{
                                   ...customer,
                                   customerDoB: formatDate(
                                        customer?.customerDoB,
                                        "YYYY-MM-DD"
                                   ).toString(),
                              }}
                              style={{
                                   width: 600,
                              }}
                              form={form}
                              layout="vertical"
                              onFinish={handleSubmit}
                              autoComplete="off"
                         >
                              <Typography.Title
                                   editable={false}
                                   level={5}
                                   className="flex justify-center"
                              >
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
                                        <Input disabled={isBooking} />
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
                                                  moment().toString()
                                             )}
                                             max={formatDate(
                                                  moment().toString()
                                             )}
                                             disabled={isBooking}
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
                                             disabled={isBooking}
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
                                        <Input disabled={isBooking} />
                                   </Form.Item>
                              </div>

                              <div className="flex justify-between gap-10 items-center">
                                   <Form.Item
                                        label="Tỉnh Thành"
                                        name="province"
                                        className="flex-1"
                                   >
                                        <Select
                                             disabled={isBooking}
                                             defaultValue={provinceId}
                                             value={provinceId}
                                             onChange={(value) => {
                                                  handleProvinceChange(value);
                                             }}
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
                                   >
                                        <Select
                                             defaultValue={districtId}
                                             value={districtId}
                                             disabled={isBooking}
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
                                        label="Xã Phường"
                                        name="wardId"
                                        className="flex-1"
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
                                             disabled={isBooking}
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
                                        <Input disabled={isBooking} />
                                   </Form.Item>
                              </div>

                              <Typography.Title
                                   editable={false}
                                   level={5}
                                   className="flex justify-center"
                              >
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
                                        <Input
                                             placeholder="Nguyễn Văn A"
                                             disabled={isBooking}
                                        />
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
                                        <Input
                                             placeholder="0123456789"
                                             disabled={isBooking}
                                        />
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
                                        <Input
                                             type="email"
                                             disabled={isBooking}
                                        />
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
                                        <Select disabled={isBooking}>
                                             {retations.map((rotation) => (
                                                  <Select.Option
                                                       value={rotation.value}
                                                  >
                                                       {rotation.lable}
                                                  </Select.Option>
                                             ))}
                                        </Select>
                                   </Form.Item>
                              </div>
                              {!isBooking && (
                                   <div className="flex justify-center">
                                        <Form.Item>
                                             <Button
                                                  type="primary"
                                                  htmlType="submit"
                                                  className="login-form-button"
                                             >
                                                  Đăng ký tiêm
                                             </Button>
                                        </Form.Item>
                                   </div>
                              )}
                         </Form>
                    </div>
               )}
          </>
     );
}

export default ChangecustomerForm;
