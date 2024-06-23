import { Card, Col, Row } from "antd";
import { FaArrowUp } from "react-icons/fa6";
import Money from "../utils/components/icons/moneyIcon";
import OrderIcon from "../utils/components/icons/orderIcon";
import Eye from "../utils/components/icons/eyeIcon";
import PieChartComponent from "../utils/components/charts/pieChart/pieChart";
import { LineChartComponent } from "../utils/components/charts/lineChart.ts/lineChart";

const DashboadPage = () => {
     return (
          <>
               <div className="bg-slate-100  pt-4 pb-20">
                    <Row gutter={15} className="!ml-2 !mr-2">
                         <Col span={8}>
                              <Card
                                   title="Doanh Thu"
                                   bordered={false}
                                   className="!bg-[#FFFED3]"
                              >
                                   <div className="w-12 h-12 rounded-full bg-slate-200 p-2 ">
                                        <Money color="#379777" />
                                   </div>
                                   <div className="flex   ">
                                        <h1 className="text-black">
                                             300.456.000{" "}
                                        </h1>
                                        <p className="flex items-center text-xl mr-10 mt-10 text-blue-800">
                                             0.43% <FaArrowUp />
                                        </p>
                                   </div>
                              </Card>
                         </Col>
                         <Col span={8}>
                              <Card
                                   title="Lượt đăng ký tiêm"
                                   bordered={false}
                                   className="!bg-[#E8C5E5]"
                              >
                                   <div className="w-12 h-12 rounded-full bg-slate-200 p-2 flex justify-center items-center ">
                                        <OrderIcon width={50} />
                                   </div>
                                   <div className="flex ml-10    ">
                                        <h1 className="text-black">16.142 </h1>
                                        <p className="flex items-center text-xl mt-10 text-blue-800">
                                             0.43% <FaArrowUp />
                                        </p>
                                   </div>
                              </Card>
                         </Col>
                         <Col span={8}>
                              <Card
                                   title="Số vắc-xin đã tiêm"
                                   bordered={false}
                                   className="!bg-[#FFCBCB]"
                              >
                                   {" "}
                                   <div className="w-12 h-12 rounded-full bg-slate-200 p-2">
                                        <Eye />
                                   </div>
                                   <div className="flex ml-10    ">
                                        <h1 className="text-black">
                                             3.456.000{" "}
                                        </h1>
                                        <p className="flex items-center text-xl mt-10 text-blue-800">
                                             0.43% <FaArrowUp />
                                        </p>
                                   </div>
                              </Card>
                         </Col>
                    </Row>
                    <div className="flex gap-28">
                         <div className="mt-4 ">
                              <LineChartComponent />
                              <p className="text-center text-2xl w-full mt-5 text-green-500">
                                   Biểu đồ doanh thu hàng tháng
                              </p>
                         </div>
                         <div className="mt-4 ">
                              <PieChartComponent />
                              <p className="text-center text-2xl w-full mt-5 text-cyan-700 ">
                                   Tỉ lệ tiêm chủng theo độ tuổi
                              </p>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default DashboadPage;
