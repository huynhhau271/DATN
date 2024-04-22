import { useEffect, useState } from "react";
import useGetAllStaff from "../hook/useGetStaff";
import { Button, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { IUser } from "../models/user.model";
import { Pagination } from "antd";
import { formatDate } from "../utils/formatDate";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

const EmployeeManagerPage = () => {
     const { Search } = Input;
     const navigate = useNavigate();
     const [page, setPage] = useState(1);
     const [limit, setLimit] = useState(10);
     const [search, setSearch] = useState("");
     const { staffs, isLoading, refetch } = useGetAllStaff(page, limit, search);
     useEffect(() => {
          refetch();
     }, [staffs, refetch, page, limit, search]);
     const onSearch = (value: string) => {
          setSearch(value);
     };
     const searchbutton = <SearchOutlined type="default" />;
     const columns: ColumnsType<IUser> = [
          {
               title: "Họ Và Tên",
               width: 100,
               dataIndex: "fullName",
               key: "fullName",
               fixed: "left",
          },
          { title: "Email", dataIndex: "email", key: "email", fixed: "left" },
          {
               title: "Số Điện Thoại",
               dataIndex: "phone",
               key: "2",
               render: (_, record) => {
                    return record.phone ? record.phone : "N/A";
               },
          },
          {
               title: "Giới Tính",
               dataIndex: "gender",
               key: "gender",
               render: (_, record) => {
                    return record ? "Nam" : "Nữ";
               },
          },
          {
               title: "Ngày Sinh",
               dataIndex: "dob",
               key: "dob",
               render: (_, record) => {
                    return record.doB ? formatDate(record.doB) : "N/A";
               },
          },
          {
               title: "Chức Vụ",
               dataIndex: "role",
               key: "role",
               render: (_, data) => {
                    return data.role.name || "N/A";
               },
          },
          {
               title: "Trạng Thái",
               dataIndex: "activated",
               key: "activated",
               render(_, record) {
                    return record ? (
                         <span className="text-green-600">Đang Làm Việc</span>
                    ) : (
                         <span className="text-red-600">Đã Nghỉ việc</span>
                    );
               },
          },
          {
               title: "Action",
               key: "operation",
               fixed: "right",
               width: 100,
               render: (_, record) => (
                    <div className="flex flex-col gap-1">
                         <Button
                              type="default"
                              className={`${
                                   record.activated
                                        ? "bg-red-600"
                                        : "bg-green-600"
                              } text-white`}
                         >
                              {record.activated ? "Block" : "Active"}
                         </Button>
                         <Button className="text-black bg-blue-500">
                              Delete
                         </Button>
                    </div>
               ),
          },
     ];
     if (!staffs || isLoading) return <Spin />;

     return (
          <div className="flex flex-col h-full mt-4 ml-1">
               <div className="flex items-end justify-between">
                    <h1 className="text-5xl  ml-4">Nhân viên</h1>

                    <Button
                         className="mr-5 mt-1 hover:!bg-blue-600 hover:opacity-[0.8] bg-blue-600 text-white h-11"
                         onClick={() => navigate("/admin/nhanvien/them-moi")}
                    >
                         Thêm Nhân viên
                    </Button>
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
                         dataSource={staffs.staffs}
                         pagination={false}
                    />
                    <Pagination
                         className="mr-5 mt-6"
                         showSizeChanger
                         defaultCurrent={page}
                         pageSize={limit}
                         total={staffs.totalPage}
                         onChange={(current, pageSize) => {
                              setPage(current);
                              setLimit(pageSize);
                         }}
                    />
               </div>
          </div>
     );
};
export default EmployeeManagerPage;
