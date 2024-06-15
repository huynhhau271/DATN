import { useEffect, useState } from "react";
import Table, { ColumnsType } from "antd/es/table";
import { Pagination } from "antd";
import { formatDate } from "../utils/formatDate";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { toast } from "react-toastify";
import { Loading } from "../utils/components/sprin";
import { Booking } from "../models/IBooking";
import useGetAllBooking from "../hook/useGetAllBooking";
import { StatusBooking, statusBooking } from "../utils/statusBooking";
import PaymentModal from "../modals/paymentModal";
import HealtCheckModal from "../modals/healtCheckModal";
import InjectModal from "../modals/injectModal";
const BookingManagerPage = () => {
     const { Search } = Input;
     const [page, setPage] = useState(1);
     const [limit, setLimit] = useState(10);
     const [search, setSearch] = useState("");
     const { bookings, isLoading, refetch } = useGetAllBooking(
          page,
          limit,
          search
     );
     useEffect(() => {
          refetch();
     }, [bookings, refetch, page, limit, search]);
     const onSearch = (value: string) => {
          setSearch(value);
     };
     const searchbutton = <SearchOutlined type="default" />;
     const columns: ColumnsType<Booking> = [
          {
               title: "Họ Và Tên",
               width: 150,
               key: "fullName",
               fixed: "left",
               render: (_, record) => {
                    return record.customer&&record.customer.customerName
                         ? record.customer.customerName
                         : "N/A";
               },
          },
          {
               title: "Mã Định Danh",
               dataIndex: "CCCD",
               key: "CCCD",
               fixed: "left",
               width: 130,
               render: (_, record) => {
                    return record.customer&&record.customer.CCCD ? record.customer.CCCD : "N/A";
               },
          },
          {
               title: "Email",
               dataIndex: "email",
               key: "email",
               width: 200,
               render: (_, record) => {
                    return record.customer&&record.customer.email
                         ? record.customer.email
                         : "N/A";
               },
          },
          {
               title: "Số Điện Thoại",
               dataIndex: "phone",
               key: "2",
               width: 120,
               render: (_, record) => {
                    return record.customer&&record.customer.phone
                         ? record.customer.phone
                         : "N/A";
               },
          },
          {
               title: "Giới Tính",
               dataIndex: "gender",
               width: 100,
               key: "gender",
               render: (_, record) => {
                    return record.customer?.gender == null
                         ? "N/A"
                         : record.customer?.gender
                         ? "Nam"
                         : "Nữ";
               },
               filters: [
                    {
                         text: "Nam",
                         value: true,
                    },
                    {
                         text: "Nữ",
                         value: false,
                    },
               ],
               onFilter(value, record) {
                    return record.customer.gender === value;
               },
          },
          {
               title: "Ngày Sinh",
               dataIndex: "dob",
               key: "dob",
               width: 150,
               render: (_, record) => {
                    return record.customer&&record.customer.customerDoB
                         ? formatDate(record.customer.customerDoB).toString()
                         : "N/A";
               },
          },
          {
               title: "Vaccine",
               key: "vaccine",
               width: 150,
               render: (_, record) => {
                    return record.vaccine.vaccineName
                         ? record.vaccine.vaccineName
                         : "N/A";
               },
          },
          {
               title: "Ngày Tiêm",
               key: "expectedDate",
               width: 150,
               render: (_, record) => {
                    return record.expectedDate
                         ? formatDate(record.expectedDate).toString()
                         : "N/A";
               },
          },
          {
               title: "Trạng Thái",
               dataIndex: "activated",
               key: "activated",
               width: 170,
               fixed: "right",
               filters: statusBooking.map((status) => {
                    return {
                         text: status.value,
                         value: status.value,
                    };
               }),
               onFilter(value, record) {
                    return record.statused === value;
               },
               render: (_, record) => {
                    return record.statused ? record.statused : "N/A";
               },
          },
          {
               title: "Tính năng",
               key: "operation",
               fixed: "right",
               width: 100,
               render: (_, record) => {
                    if (record.statused === StatusBooking.NOTIFICATION_SENT)
                         return (
                              <HealtCheckModal
                                   refetch={refetch}
                                   idBooking={record.id}
                                   fullName={record.customer.customerName}
                                   dob={record.customer.customerDoB}
                                   gender={record.customer.gender}
                              />
                         );
                    if (
                         record.statused === StatusBooking.BE_INJECTED &&
                         !record.paymentSatus
                    )
                         return (
                              <PaymentModal
                                   bookingId={record.id}
                                   refetch={refetch}
                                   vaccine={record.vaccine}
                              />
                         );
                    if (
                         record.statused === StatusBooking.BE_INJECTED &&
                         record.paymentSatus
                    )
                         return (
                              <InjectModal
                                   bookingId={record.id}
                                   refetch={refetch}
                              />
                         );
               },
          },
     ];
     if (!bookings || isLoading) return <Loading />;

     return (
          <>
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-5xl  ml-4">Danh Sách Đăng Ký</h1>
                    </div>
                    <div className="flex flex-col items-end w-full">
                         <Search
                              className="w-6/12 mr-5 mt-2"
                              placeholder="Search"
                              onSearch={onSearch}
                              enterButton={searchbutton}
                              style={{ width: 400 }}
                              size="large"
                         />
                         <Table
                              className="h-full w-full mt-6"
                              columns={columns}
                              dataSource={bookings?.bookings}
                              scroll={{ x: 1300 }}
                              pagination={false}
                         />
                         <Pagination
                              className="!mr-5 !mt-10"
                              showSizeChanger
                              defaultCurrent={page}
                              pageSize={limit}
                              total={bookings.totalPage + 1}
                              onChange={(current, pageSize) => {
                                   setPage(current);
                                   setLimit(pageSize);
                              }}
                         />
                    </div>
               </div>
          </>
     );
};
export default BookingManagerPage;
