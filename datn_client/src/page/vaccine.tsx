import { useEffect, useState } from "react";

import { Button, Card, Empty } from "antd";
import { MdOutlineVaccines } from "react-icons/md";
import { Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import useGetAllVaccine from "../hook/useGetVaccine";
import VaccineModal from "../modals/vaccineModal";
import { RxUpdate } from "react-icons/rx";
import { vaccineService } from "../services/vaccineService";
import { toast } from "react-toastify";
import { TbVaccineBottle } from "react-icons/tb";
import { TbVaccineBottleOff } from "react-icons/tb";
import { Loading } from "../utils/components/sprin";

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
     const handleBlockOrActiveVaccine = (
          idVaccine: number,
          active: boolean
     ) => {
          vaccineService
               .blockOrActiveVaccine(idVaccine, active)
               .then(() => {
                    toast.success(
                         active
                              ? "Vac Xin Đã Ngừng Sản Xuất"
                              : "Vac Xin Hiện Đang Sản Xuất"
                    );
                    refetch();
               })
               .catch((error) => {
                    if (error.response)
                         toast.error(error.response.data.message);
                    toast.error(
                         active
                              ? "Khóa Vac Xin Thất Bại"
                              : "Mở Khóa Vac Xin Thất Bại"
                    );
               });
     };
     const searchbutton = <SearchOutlined type="default" />;
     if (!vaccines || isLoading) return <Loading />;

     return (
          <div className="flex flex-col">
               <div className="flex flex-col h-full mt-4 ml-1">
                    <div className="flex items-end justify-between">
                         <h1 className="text-5xl  ml-4">Vaccine</h1>
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

                         {vaccines.vaccines?.length > 0 ? (
                              <div
                                   className="flex gap-10 flex-wrap mt-6 justify-start items-center
                           w-full"
                              >
                                   {vaccines.vaccines.map((vaccine) => {
                                        return (
                                             <Card
                                                  className="!ml-7 w-72 h-96"
                                                  hoverable={true}
                                                  title={vaccine.vaccineName}
                                                  cover={
                                                       <img
                                                            alt="vaccine"
                                                            src={
                                                                 vaccine.picture
                                                            }
                                                            style={{
                                                                 objectFit:
                                                                      "cover",
                                                                 height: "150px",
                                                            }}
                                                       />
                                                  }
                                                  actions={[
                                                       <Button
                                                            ghost
                                                            className={`${
                                                                 vaccine.status
                                                                      ? "!bg-red-600"
                                                                      : "!bg-green-600"
                                                            } text-white flex items-center gap-2 text-xl justify-center`}
                                                            onClick={() => {
                                                                 vaccine.status !=
                                                                      undefined &&
                                                                      handleBlockOrActiveVaccine(
                                                                           vaccine.id,
                                                                           vaccine.status
                                                                      );
                                                            }}
                                                       >
                                                            <span>
                                                                 {vaccine.status ? (
                                                                      <TbVaccineBottleOff />
                                                                 ) : (
                                                                      <TbVaccineBottle />
                                                                 )}
                                                            </span>
                                                       </Button>,
                                                       <div className="w-30">
                                                            <VaccineModal
                                                                 refetch={
                                                                      refetch
                                                                 }
                                                                 icon={
                                                                      <RxUpdate />
                                                                 }
                                                                 data={vaccine}
                                                            />
                                                       </div>,
                                                  ]}
                                             >
                                                  <div className="flex flex-col  w-full">
                                                       <span className="flex gap-2">
                                                            <strong>
                                                                 Số Lượng :
                                                            </strong>
                                                            <p>
                                                                 {
                                                                      vaccine.quantity
                                                                 }
                                                            </p>
                                                       </span>
                                                       <span className="flex gap-2">
                                                            <strong>
                                                                 Giá Bán:
                                                            </strong>
                                                            <p>
                                                                 {vaccine.price}
                                                                 (Đồng)
                                                            </p>
                                                       </span>
                                                       <span className="flex gap-2">
                                                            <strong>
                                                                 Độ Tuổi:
                                                            </strong>
                                                            <p>
                                                                 {
                                                                      vaccine.mothOld
                                                                 }
                                                                 (Tháng)
                                                            </p>
                                                       </span>
                                                       <span className="flex gap-2">
                                                            <strong>
                                                                 Trạng Thái:
                                                            </strong>
                                                            <p
                                                                 className={
                                                                      !vaccine.status
                                                                           ? "text-red-600"
                                                                           : "text-green-600"
                                                                 }
                                                            >
                                                                 {vaccine.status !==
                                                                 undefined
                                                                      ? vaccine.status
                                                                           ? "Đang Sản Xuất"
                                                                           : "Đã Ngừng Sản Xuất"
                                                                      : "N/A"}
                                                            </p>
                                                       </span>
                                                  </div>
                                             </Card>
                                        );
                                   })}
                              </div>
                         ) : (
                              <div
                                   className="flex gap-10 flex-wrap mt-6 justify-center items-center
                      w-full"
                              >
                                   <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{ height: 60 }}
                                        description={
                                             <span>
                                                  Chưa Có Vaccine Nào Trong Hệ
                                                  Thống
                                             </span>
                                        }
                                        className="flex justify-center flex-col items-center"
                                   >
                                        <VaccineModal
                                             title="Thêm Vaccine"
                                             icon={<MdOutlineVaccines />}
                                             refetch={refetch}
                                        />
                                   </Empty>
                              </div>
                         )}
                    </div>
               </div>
               <div className="flex justify-end">
                    <Pagination
                         className="!mt-20 !mr-10"
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
