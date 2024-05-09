import { useEffect, useState } from "react";

import { Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { MdOutlineVaccines } from "react-icons/md";
import { Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { IVaccine } from "../models/vaccine.model";
import useGetAllVaccine from "../hook/useGetVaccine";
import VaccineModal from "../modals/vaccineModal";
import { RxUpdate } from "react-icons/rx";

const VaccineManagerPage = () => {
     const { Search } = Input;
     const [page, setPage] = useState(1);
     const [limit, setLimit] = useState(10);
     const [search, setSearch] = useState("");
     const { vaccines, isLoading, refetch } = useGetAllVaccine(
          page,
          limit,
          search
     );
     useEffect(() => {
          refetch();
     }, [vaccines, refetch, page, limit, search]);
     const onSearch = (value: string) => {
          setSearch(value);
     };
     // const handleBlockOrActiveUser = (idUser: number, active: boolean) => {};
     const searchbutton = <SearchOutlined type="default" />;
     const columns: ColumnsType<IVaccine> = [
          {
               title: "Tên Vaccine",
               dataIndex: "vaccineName",
               key: "vaccineName",
               fixed: "left",
          },
          {
               title: "Số lượng",
               dataIndex: "quantity",
               key: "quantity",
          },
          {
               title: "Giá",
               dataIndex: "price",
               key: "price",
          },
          {
               title: "Mô tả",
               dataIndex: "description",
               key: "description",
          },
          {
               title: "Nguồn gốc",
               dataIndex: "source",
               key: "source",
          },
          {
               title: "Đường tiêm",
               dataIndex: "injectionRoute",
               key: "injectionRoute",
          },
          {
               title: "Loại",
               dataIndex: "type",
               key: "type",
               render: (_, data) => {
                    return data.type || "N/A";
               },
          },
          {
               title: "",
               dataIndex: "type",
               key: "type",
               render: (_, data) => {
                    return data.type || "N/A";
               },
          },
          {
               title: "Loại",
               dataIndex: "type",
               key: "type",
               render: (_, data) => {
                    return data.type || "N/A";
               },
          },
          {
               title: "Action",
               key: "operation",
               fixed: "right",
               width: 100,
               render: (_, record) => {
                    return (
                         <div className=" flex gap-3">
                              <VaccineModal
                                   refetch={refetch}
                                   icon={<RxUpdate />}
                                   data={record}
                              />
                         </div>
                    );
               },
          },
     ];
     if (!vaccines || isLoading) return <Spin />;

     return (
          <>
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-5xl  ml-4">Nhân viên</h1>
                         <div>
                              <VaccineModal
                                   title="Thêm Vaccine"
                                   icon={<MdOutlineVaccines />}
                                   refetch={refetch}
                              />
                         </div>
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
                              dataSource={vaccines.vaccines}
                              pagination={false}
                         />
                         <Pagination
                              className="!mr-5 !mt-10"
                              showSizeChanger
                              defaultCurrent={page}
                              pageSize={limit}
                              total={vaccines?.totalPage}
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
export default VaccineManagerPage;
