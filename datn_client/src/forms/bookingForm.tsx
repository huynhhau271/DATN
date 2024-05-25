import { Button, Form, Input, Select, Typography } from "antd";
import { useGetProvince } from "../hook/useGetProvince";
import { useEffect, useState } from "react";
import { IDistrict, IWard } from "../models/province.model";
import useGetAllVaccineByMothOld from "../hook/useGetAllVaccineByMoth";
import { IBookingForm, IBookingPayload } from "../models/IBooking";
import moment from "moment";
import { formatDate } from "../utils/formatDate";
import { rotations } from "../utils/rotation";
import { ICustomer } from "../models/ICustomer";
import { bookingService } from "../services/bookingService";
import { toast } from "react-toastify";
import Table, { ColumnsType } from "antd/es/table";
interface DataTable {
     vaccineName: string;
     noseNumber: number;
     date: Date;
}
interface IProps {
     setEmail: (vl: string) => void;
     setName: (vl: string) => void;
     setDob: (vl: string) => void;
     setOpenModalConfirm: (vl: boolean) => void;
}
function BookingForm({
     setEmail,
     setDob,
     setName,
     setOpenModalConfirm,
}: IProps) {
     const [mothOld, setMothOld] = useState(0);
     const { provinces } = useGetProvince();
     const { vaccines, refetch } = useGetAllVaccineByMothOld(mothOld);
     const [districts, setDistricts] = useState<IDistrict[] | undefined>([]);
     const [wards, setWards] = useState<IWard[] | undefined>([]);
     const [wardId, setWardId] = useState<string>("");
     const [form] = Form.useForm();

     const [dataTable, setDataTable] = useState<DataTable[] | undefined>(
          undefined
     );
     const [vaccineId, setVaccineId] = useState();
     const [dateinject, setDateInject] = useState(
          formatDate(moment().add(7, "days").toString())
     );
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
     const handleSubmit = (value: IBookingForm) => {
          const customer: ICustomer = {
               customerName: value?.customerName,

               customerDoB: value.customerDoB,

               gender: value.gender,

               parentsName: value.parentsName,

               phone: value.phone,

               email: value.email,

               wardId: value.wardId,
               address: value.address,
          };
          const booking: IBookingPayload = {
               vaccineId: value.vaccineId,
               expectedDate: value.expectedDate,
               customer: customer,
          };
          const payload =
               dataTable && dataTable.length > 0
                    ? dataTable?.map((data: DataTable) => {
                           return {
                                ...booking,
                                expectedDate: data.date,
                           };
                      })
                    : [booking];
          console.log({ payload });

          bookingService
               .Booking([booking].concat(payload))
               .then(() => {
                    setOpenModalConfirm(true);
                    toast.success("Vui Lòng Kiểm Tra Email");
                    setVaccineId(undefined);
                    setDataTable(undefined);
                    form.resetFields();
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else toast.error("Đăng Ký Tiêm Chủng Thất Bại");
               });
     };
     useEffect(() => {
          refetch();
     }, [mothOld, refetch]);
     const columns: ColumnsType<DataTable> = [
          {
               title: "Vaccine",
               width: 100,
               dataIndex: "vaccineName",
               key: "vaccine",
          },
          {
               title: "Mũi Thứ",
               width: 100,
               dataIndex: "noseNumber",
               key: "noseNumber",
               sorter: (a, b) => a.noseNumber - b.noseNumber,
          },
          {
               title: "Ngày Tiêm",
               width: 100,
               dataIndex: "date",
               key: "date",
               render: (_, record) => {
                    return record.date
                         ? formatDate(record.date).toString()
                         : "N/A";
               },
               sorter: {
                    compare: (a, b) =>
                         moment(a.date).unix() - moment(b.date).unix(),
               },
          },
     ];
     useEffect(() => {
          const vaccine = vaccines?.find((vc) => vc.id === vaccineId);
          let currentDate: Date;
          let data: DataTable[] | undefined = vaccine?.boosterNoses?.map(
               (boot, index) => {
                    if (index == 0) {
                         currentDate = moment(dateinject)
                              .add(boot.distance, "M")
                              .toDate();
                         return {
                              vaccineName: vaccine.vaccineName,
                              noseNumber: boot.noseNumber,
                              date: moment(dateinject)
                                   .add(boot.distance, "M")
                                   .toDate(),
                         } as DataTable;
                    } else {
                         currentDate = moment(currentDate)
                              .add(currentDate.toString(), "M")
                              .toDate();
                         return {
                              vaccineName: vaccine.vaccineName,
                              noseNumber: boot.noseNumber,
                              date: moment(currentDate)
                                   .add(boot.distance, "M")
                                   .toDate(),
                         } as DataTable;
                    }
               }
          );
          const first: DataTable[] = [
               {
                    vaccineName: vaccine?.vaccineName
                         ? vaccine?.vaccineName
                         : "",
                    noseNumber: 1,
                    date: moment(dateinject).toDate(),
               },
          ];
          data = vaccine ? (data ? first.concat(data) : first) : undefined;
          console.log({ data });

          setDataTable(data);
     }, [vaccineId, vaccines, dateinject]);
     return (
          <>
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
                                   {
                                        validator: (_, e) => validateDob(e),
                                   },
                              ]}
                              className="flex-1"
                         >
                              <Input
                                   type="date"
                                   onChange={(e) => {
                                        {
                                             const today = moment();
                                             const monthsDifference =
                                                  today.diff(
                                                       moment(e.target.value),
                                                       "month"
                                                  );
                                             setMothOld(monthsDifference);
                                             setDob(e.target.value);
                                        }
                                   }}
                                   defaultValue={formatDate(
                                        moment().toString()
                                   )}
                                   max={formatDate(moment().toString())}
                              />
                         </Form.Item>
                    </div>
                    <div className="w-[50%]">
                         <Form.Item
                              label="Giới tính"
                              name="gender"
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
                              <Input
                                   placeholder="Nguyễn Văn A"
                                   onChange={(e) => setName(e.target.value)}
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
                              <Input
                                   onChange={(e) => setEmail(e.target.value)}
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
                              <Select>
                                   {rotations.map((rotation) => (
                                        <Select.Option value={rotation.value}>
                                             {rotation.lable}
                                        </Select.Option>
                                   ))}
                              </Select>
                         </Form.Item>
                    </div>
                    <Typography.Title editable={false} level={5}>
                         THÔNG TIN DỊCH VỤ
                    </Typography.Title>
                    <div className="flex w-full justify-between gap-2">
                         <Form.Item
                              label="Vaccine"
                              name="vaccineId"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Chọn Vaccine!",
                                   },
                              ]}
                         >
                              <Select onChange={setVaccineId}>
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
                              name="expectedDate"
                              className="flex-1"
                              rules={[
                                   {
                                        required: true,
                                        message: "Vui Lòng Chọn Ngày Tiêm",
                                   },
                              ]}
                              initialValue={formatDate(
                                   moment().add(7, "days").toString()
                              )}
                         >
                              <Input
                                   type="date"
                                   defaultValue={formatDate(
                                        moment().add(7, "days").toString()
                                   )}
                                   min={formatDate(
                                        moment().add(7, "days").toString()
                                   )}
                                   onChange={(e) =>
                                        setDateInject(e.target.value)
                                   }
                              />
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
               {dataTable && dataTable.length > 0 && (
                    <Table
                         className="h-full w-3/4"
                         columns={columns}
                         dataSource={dataTable}
                         pagination={false}
                    />
               )}
          </>
     );
}

export default BookingForm;
