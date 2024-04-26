import { useEffect, useState } from "react";

import { Button, Spin } from "antd";
import Table, { ColumnsType } from "antd/es/table";

import { Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { fakeVaccines } from "../utils/dataFake";
import { Vaccine } from "../models/vaccine.model";
import useGetAllVaccine from "../hook/useGetVaccine";

const VaccineManagerPage = () => {
  const { Search } = Input;
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const { isLoading, refetch } = useGetAllVaccine(page, limit, search); // get data real

  const vaccines = fakeVaccines;
  useEffect(() => {
    refetch();
  }, [vaccines, refetch, page, limit, search]);

  const onSearch = (value: string) => {
    setSearch(value);
  };
  const searchButton = <SearchOutlined type="default" />;

  const columns: ColumnsType<Vaccine> = [
    {
      title: "Mã Vaccine",
      width: 100,
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
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
      title: "Hình ảnh",
      dataIndex: "role",
      key: "role",
      render: (_, data) => {
        return data.picture || "N/A";
      },
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
      title: "Thông tin cảnh báo",
      dataIndex: "warning",
      key: "warning",
    },
    {
      title: "Chống chỉ định",
      dataIndex: "unwantedEffects",
      key: "unwantedEffects",
    },

    {
      title: "Phản ứng sau tiêm",
      dataIndex: "postInjectionReact",
      key: "postInjectionReact",
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
      render: (_) => (
        <div className="flex flex-col gap-1">
          <Button type="default" className={`bg-orange-400 text-white`}>
            Edit
          </Button>
          <Button className="text-black bg-red-600">Delete</Button>
        </div>
      ),
    },
  ];
  if (!vaccines || isLoading) return <Spin />;

  return (
    <div className="flex flex-col h-full mt-4 ml-1 p-2">
      <div className="flex items-end justify-between">
        <h1 className="text-5xl  ml-4">Vaccine</h1>

        <Button
          className="mr-5 mt-1 hover:!bg-blue-600 hover:opacity-[0.8] bg-blue-600 text-white h-11"
          onClick={() => navigate("/admin/vaccine/them-moi")}
        >
          Thêm Vaccine
        </Button>
      </div>
      <div className="flex flex-col items-end w-full">
        <Search
          className="w-6/12 mr-5 mt-2"
          placeholder="Search"
          onSearch={onSearch}
          enterButton={searchButton}
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
          className="mr-5 mt-6"
          showSizeChanger
          defaultCurrent={page}
          pageSize={limit}
          total={vaccines.totalPage}
          onChange={(current, pageSize) => {
            setPage(current);
            setLimit(pageSize);
          }}
        />
      </div>
    </div>
  );
};
export default VaccineManagerPage;

