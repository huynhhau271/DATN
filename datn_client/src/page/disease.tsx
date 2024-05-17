import { useEffect, useState } from "react";
import Table, { ColumnsType } from "antd/es/table";
import { Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { FaEdit } from "react-icons/fa";
import useGetAllDisease from "../hook/useDisease";
import { IDisease } from "../models/disease.model";
import { Loading } from "../utils/components/sprin";
import DiseaseModal from "../modals/diseaseModal";
import DeleteDiseaseModal from "../modals/deleteDiseaseMoadl";
import { IoMdAdd } from "react-icons/io";
const DiseaseManagerPage = () => {
     const { Search } = Input;
     const [page, setPage] = useState(1);
     const [limit, setLimit] = useState(10);
     const [search, setSearch] = useState("");
     const { diseases, isLoading, refetch } = useGetAllDisease(
          page,
          limit,
          search
     );
     useEffect(() => {
          refetch();
     }, [diseases, refetch, page, limit, search]);
     const onSearch = (value: string) => {
          setSearch(value);
     };
     const searchbutton = <SearchOutlined type="default" />;
     const columns: ColumnsType<IDisease> = [
          {
               title: "Tên Bệnh",
               dataIndex: "diseaseName",
               key: "diseaseName",
          },
          { title: "Triệu Chứng", dataIndex: "symptom", key: "symptom" },
          {
               title: "Cách Phòng Tránh",
               dataIndex: "revention",
               key: "revention",
          },
          {
               title: "Tính năng",
               key: "operation",
               fixed: "right",
               width: 100,
               render: (_, record) => (
                    <div className="flex gap-1">
                         <div>
                              <DiseaseModal
                                   icon={<FaEdit />}
                                   refetch={refetch}
                                   data={record}
                              />
                         </div>
                         <div>
                              <DeleteDiseaseModal
                                   diseaseName={record.diseaseName}
                                   refetch={refetch}
                                   id={record.id}
                              />
                         </div>
                    </div>
               ),
          },
     ];
     if (!diseases || isLoading) return <Loading />;

     return (
          <>
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-5xl  ml-4">Bệnh Học</h1>
                         <DiseaseModal
                              title="Thêm Bệnh Mới"
                              icon={<IoMdAdd />}
                              refetch={refetch}
                         />
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
                              dataSource={diseases.diseases}
                              pagination={false}
                         />
                         <Pagination
                              className="!mr-5 !mt-10"
                              showSizeChanger
                              defaultCurrent={page}
                              pageSize={limit}
                              total={diseases.totalPage}
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
export default DiseaseManagerPage;
