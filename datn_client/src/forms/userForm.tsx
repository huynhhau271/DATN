import { Button, Form, Input, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useGetProvince } from "../hook/useGetProvince";
import { IDistrict, IProvince, IWard } from "../models/province.model";
import { IUser } from "../models/user.model";
import { staffService } from "../services/staffService";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import moment from "moment";
import { UserRole } from "../utils/userRole";
interface Props {
     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
     userData?: IUser;
     refetch: () => void;
}
const UserForm = ({ setOpen, refetch, userData }: Props) => {
     const { provinces: provinceData } = useGetProvince();
     const [provinces, setProvinces] = useState<IProvince[] | undefined>([]);
     const [provinceId, setProvinceId] = useState("");
     const [districts, setDistricts] = useState<IDistrict[]>([]);
     const [districtId, setDistrictId] = useState<string>("");
     const [wards, setWards] = useState<IWard[] | undefined>([]);
     const [wardId, setWardId] = useState<string>("");
     const isEdit = userData !== undefined;
     const defaultValues = useMemo(
          () =>
               isEdit
                    ? { ...userData, dob: formatDate(userData.dob) }
                    : undefined,
          [isEdit, userData]
     );
     const handleProvinceChange = (value: string) => {
          setProvinceId(value);
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
     const validateDob = (value: string) => {
          const today = moment();
          if (today.diff(moment(value), "years") < 18)
               return Promise.reject("Nhân Viên Chưa Đủ 18 Tuổi");
          else return Promise.resolve();
     };
     const [form] = Form.useForm<IUser>();
     const onFinish = (value: IUser) => {
          if (!isEdit)
               staffService
                    .createUser({ ...value, wardId: wardId })
                    .then(() => {
                         toast.success("Thêm Mới Nhân Viên Thành Công");
                         refetch();
                         form.resetFields();
                         setOpen(false);
                    })
                    .catch((error) => {
                         if (error.response)
                              toast.error(error.response.data.message);
                         else toast.error("Thêm mới Nhân Viên Thất Bại");
                    });
          else {
               staffService
                    .updateStaff({ ...value, id: userData.id })
                    .then(() => {
                         toast.success(
                              "Cập Nhật Thông Tinh Nhân Viên Thành Công"
                         );
                         refetch();
                         form.resetFields();
                         setOpen(false);
                    })
                    .catch((error) => {
                         if (error.response)
                              toast.error(error.response.data.message);
                         else
                              toast.error(
                                   "Cập Nhật Thông Tin Nhân Viên Thất Bại"
                              );
                    });
          }
     };
     const onReset = () => {
          form.resetFields();
          if (userData?.provinceId && userData.districtId && userData.wardId) {
               setProvinceId(userData.provinceId || "");
               setDistrictId(userData.districtId || "");
               setWardId(userData.wardId || "");
          }
     };
     useEffect(() => {
          form.resetFields();
     }, [userData, form]);
     useEffect(() => {
          setProvinces(provinceData);
          if (userData?.provinceId) setProvinceId(userData?.provinceId);
     }, [provinceData, userData?.provinceId]);

     useEffect(() => {
          if (userData?.districtId) setDistrictId(userData?.districtId);
          setDistricts(
               provinces?.find((provice) => provice.id === provinceId)
                    ?.districts as IDistrict[]
          );
     }, [provinceId, provinces, userData?.districtId]);

     useEffect(() => {
          if (userData?.wardId) setWardId(userData?.wardId);
          setWards(
               districts?.find((district) => district.id === districtId)
                    ?.wards as IWard[]
          );
     }, [districts, districtId, userData?.wardId]);

     console.log({ userData, provinceId });

     return (
          <div className="mt-2">
               <Form
                    initialValues={defaultValues}
                    scrollToFirstError
                    layout="vertical"
                    form={form}
                    name="control-hooks"
                    className=""
                    onFinish={onFinish}
                    autoComplete="off"
                    style={{ maxWidth: 800 }}
               >
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Họ Và Tên"
                              name="fullName"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Họ Và Tên!",
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Input />
                         </Form.Item>
                         <Form.Item
                              label="Email"
                              name="email"
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
                              className="flex-1"
                         >
                              <Input type="email" />
                         </Form.Item>
                         <Form.Item
                              name="roleName"
                              label="Chức Vụ"
                              className="flex-1"
                         >
                              <Select>
                                   {UserRole.map((role) => {
                                        return (
                                             <Select.Option value={role.value}>
                                                  {role.label}
                                             </Select.Option>
                                        );
                                   })}
                              </Select>
                         </Form.Item>
                    </div>
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Phone"
                              name="phone"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Số Điện Thoại!",
                                   },
                                   {
                                        pattern: /^\d{10}$/,
                                        message: "Số Điện Thoại Không Hợp Lệ",
                                   },
                              ]}
                         >
                              <Input type="text" />
                         </Form.Item>
                         <Form.Item
                              label="Ngày Sinh"
                              name="dob"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Nhập Ngày Sinh",
                                   },
                                   {
                                        validator: (_, e) => {
                                             return validateDob(e);
                                        },
                                   },
                              ]}
                         >
                              <Input
                                   type="date"
                                   defaultValue={userData?.dob || undefined}
                              />
                         </Form.Item>
                         <Form.Item
                              label="Giới Tính"
                              name="gender"
                              className="flex-1"
                         >
                              <Select
                                   defaultValue={true}
                                   options={[
                                        { label: "Nam", value: true },
                                        { label: "Nữ", value: false },
                                   ]}
                              />
                         </Form.Item>
                    </div>
                    <div className="flex justify-between gap-10 items-center">
                         <Form.Item
                              label="Tỉnh Thành"
                              name="province"
                              className="flex-1"
                         >
                              <Select
                                   defaultValue={provinceId}
                                   value={provinceId}
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
                         >
                              <Select
                                   defaultValue={districtId}
                                   value={districtId}
                                   disabled={provinceId ? false : true}
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
                                   disabled={districtId ? false : true}
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
                    <Form.Item className="flex justify-center">
                         <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                         >
                              OK
                         </Button>
                         <Button
                              htmlType="button"
                              onClick={onReset}
                              className="ml-3"
                         >
                              Reset
                         </Button>
                    </Form.Item>
               </Form>
          </div>
     );
};
export default UserForm;
