import {
     Button,
     Empty,
     Form,
     Input,
     Select,
     Typography,
     notification,
} from "antd";
import { formatDate } from "../utils/formatDate";
import Table, { ColumnsType } from "antd/es/table";
import { ICustomer } from "../models/ICustomer";
import { useEffect, useState } from "react";
import moment from "moment";
import useGetAllVaccineByMothOld from "../hook/useGetAllVaccineByMoth";
import { IBookingPayload } from "../models/IBooking";
import { bookingService } from "../services/bookingService";
import { toast } from "react-toastify";
interface IProps {
     customer: ICustomer;
     refetch: () => void;
     setOpenModalConfirm: (vl: boolean) => void;
}
interface DataTable {
     customerName?: string;
     customerDob?: Date;
     vaccineName?: string;
     expectedDate: Date;
     status?: string;
}
interface DataTableInfoBooking {
     vaccineName: string;
     noseNumber: number;
     date: Date;
}
function CustomerBookingForm({
     customer,
     setOpenModalConfirm,
     refetch,
}: IProps) {
     const [form] = Form.useForm();
     const today = moment();
     const monthsDifference = today.diff(moment(customer.customerDoB), "month");
     const [dataTable, setDataTable] = useState<DataTable[]>();
     const [infoBooking, setInfoBooking] = useState<DataTableInfoBooking[]>();
     const { vaccines } = useGetAllVaccineByMothOld(monthsDifference);
     const [vaccineId, setVaccineId] = useState();
     const [dateinject, setDateInject] = useState(
          formatDate(moment().add(7, "days").toString())
     );
     const columnsHistory: ColumnsType<DataTable> = [
          {
               title: "Họ Và Tên Trẻ",
               width: 100,
               dataIndex: "customerName",
               key: "customerName",
          },
          {
               title: "Mã Định Danh",
               width: 100,
               dataIndex: "CCCD",
               key: "CCCD",
          },
          {
               title: "Ngày Sinh",
               width: 100,
               dataIndex: "customerDob",
               key: "customerDob",
               render: (_, r) => {
                    return r.customerDob ? formatDate(r.customerDob) : "N/A";
               },
          },
          {
               title: "Vaccine",
               width: 100,
               dataIndex: "vaccineName",
               key: "vaccineName",
          },
          {
               title: "Ngày Tiêm",
               width: 100,
               dataIndex: "expectedDate",
               key: "expectedDate",
               render: (_, r) => {
                    return r.expectedDate ? formatDate(r.expectedDate) : "N/A";
               },
          },
          {
               title: "Trạng Thái",
               width: 100,
               dataIndex: "status",
               key: "status",
          },
     ];
     const columnsInfo: ColumnsType<DataTableInfoBooking> = [
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
          let data: DataTableInfoBooking[] | undefined =
               vaccine?.boosterNoses?.map((boot, index) => {
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
                         } as DataTableInfoBooking;
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
                         } as DataTableInfoBooking;
                    }
               });
          const first: DataTableInfoBooking[] = [
               {
                    vaccineName: vaccine?.vaccineName
                         ? vaccine?.vaccineName
                         : "",
                    noseNumber: 1,
                    date: moment(dateinject).toDate(),
               },
          ];
          data = vaccine ? (data ? first.concat(data) : first) : undefined;
          setInfoBooking(data);
     }, [vaccineId, vaccines, dateinject]);
     useEffect(() => {
          const booking = customer.bookings;
          const data = booking?.map((book) => {
               return {
                    customerName: customer.customerName,
                    customerDob: customer.customerDoB,
                    CCCD: customer.CCCD,
                    vaccineName: book.vaccine?.vaccineName,
                    expectedDate: book.expectedDate,
                    status: book.statused,
               } as DataTable;
          });
          setDataTable(data);
     }, [customer]);

     const onSubmit = (value: any) => {
          const booking: IBookingPayload = {
               vaccineId: value.vaccineId,
               expectedDate: value.expectedDate,
               customerId: customer.id,
          };
          const payload =
               infoBooking && infoBooking.length > 0
                    ? infoBooking?.map((data) => {
                           return {
                                ...booking,
                                expectedDate: data.date,
                           };
                      })
                    : [booking];
          console.log({ payload, dataTable });

          bookingService
               .Booking(payload)
               .then(() => {
                    setOpenModalConfirm(true);
                    toast.success("Vui Lòng Kiểm Tra Email");
                    setVaccineId(undefined);
                    setDataTable(undefined);
                    setOpenModalConfirm(true);
                    form.resetFields();
                    refetch();
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    else toast.error("Đăng Ký Tiêm Chủng Thất Bại");
               });
     };
     return (
          <>
               <div className="flex flex-col items-center gap-2 w-2/4 ml-3">
                    <span className="flex  justify-between w-4/5">
                         <strong>Họ Và Tên Trẻ:</strong>
                         <p>{customer.customerName}</p>
                    </span>
                    <span className="flex  justify-between w-4/5">
                         <strong>CCCD:</strong>
                         <p>{customer.CCCD}</p>
                    </span>
                    <span className="flex  justify-between w-4/5">
                         <strong>Ngày Sinh:</strong>
                         <p>{formatDate(customer.customerDoB)}</p>
                    </span>
                    <span className="flex  justify-between w-4/5">
                         <strong>Họ Và Tên Bố Mẹ:</strong>
                         <p>{customer.parentsName}</p>
                    </span>
                    <span className="flex  justify-between w-4/5">
                         <strong>Số Điện Thoại Bố Mẹ:</strong>
                         <p>{customer.phone}</p>
                    </span>
                    <span className="flex  justify-between w-4/5">
                         <strong>Email Bố Mẹ:</strong>
                         <p>{customer.email}</p>
                    </span>
               </div>
               <div>
                    <Form
                         style={{
                              width: 600,
                         }}
                         form={form}
                         layout="vertical"
                         name="customer"
                         onFinish={onSubmit}
                         autoComplete="off"
                    >
                         <Typography.Title editable={false} level={5}>
                              Đăng Ký Tiêm
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
                                                  <Select.Option
                                                       value={vaccine.id}
                                                  >
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
                                   Đặt Lịch Tiêm
                              </Button>
                         </Form.Item>
                    </Form>
               </div>
               <div className="w-full flex justify-center flex-col items-center gap-4">
                    {infoBooking && infoBooking.length > 0 && (
                         <>
                              <Typography.Title editable={false} level={5}>
                                   Thông Tin Đăng Ký
                              </Typography.Title>
                              <Table
                                   className="h-full w-3/4"
                                   columns={columnsInfo}
                                   dataSource={infoBooking}
                                   pagination={false}
                              />
                         </>
                    )}
               </div>
               <div className="w-9/12">
                    <Typography.Title editable={false} level={5}>
                         Lịch Sử Tiêm Chủng Của Trẻ
                    </Typography.Title>
                    {dataTable && dataTable.length > 0 ? (
                         <Table
                              className="h-full w-full"
                              columns={columnsHistory}
                              dataSource={dataTable}
                              pagination={false}
                         />
                    ) : (
                         <Empty
                              className="flex justify-center flex-col items-center"
                              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                              imageStyle={{
                                   height: 60,
                              }}
                              description={
                                   <span className="text-center">
                                        Quý Khách Hàng Chưa Thực Hiện Tiêm Chủng
                                        Tại Trung Tâm
                                   </span>
                              }
                         ></Empty>
                    )}
               </div>
          </>
     );
}

export default CustomerBookingForm;
