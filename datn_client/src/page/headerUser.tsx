import { Anchor, ConfigProvider, Image, Popconfirm } from "antd";
import { MenuUser } from "../constants/menuItems";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import Search from "antd/es/input/Search";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { ICustomer } from "../models/ICustomer";
import { FaUser } from "react-icons/fa";
import cookiesService from "../services/cookiesService";
function HeaderUserComponent() {
     const { userLogin, setUserLogin } = useAuthContext();
     const navigate = useNavigate();
     console.log({ userLogin });

     return (
          <>
               <div className="flex justify-between items-center w-full gap-6 ">
                    <div className="h-full flex items-center">
                         <Image
                              preview={false}
                              src="../public/logo.svg"
                              style={{
                                   objectFit: "cover",
                                   margin: "5px",
                              }}
                         />
                    </div>
                    <div className="flex items-center h-full w-full justify-between">
                         <div className="flex h-full items-center">
                              <Search
                                   placeholder="Search..."
                                   style={{ width: 250 }}
                                   allowClear
                              />
                         </div>
                         <div className="flex justify-between items-center  mr-7 gap-5">
                              <Link to="/dang-ky-tiem-chung">
                                   <div className="flex justify-center items-center text-[#102A83] font-bold hover:text-red-500 hover:cursor-pointer">
                                        <FaCalendarAlt
                                             size={20}
                                             color="#102A83"
                                        />
                                        <span>Đặt Lịch Tiêm</span>
                                   </div>
                              </Link>
                              <Link to="/so-theo-gioi">
                                   <div className="flex justify-center items-center text-[#102A83] font-bold gap-2 hover:text-red-500">
                                        <BiSolidMessageRoundedDetail
                                             size={20}
                                             color="#102A83"
                                        />
                                        <span>Sổ Theo dõi</span>
                                   </div>
                              </Link>
                              <div className="flex gap-2">
                                   {!userLogin ? (
                                        <>
                                             <Link to="/dang-nhap">
                                                  <div className="flex justify-center items-center text-[#102A83] font-bold gap-2 hover:text-red-500">
                                                       <BiSolidMessageRoundedDetail
                                                            size={20}
                                                            color="#102A83"
                                                       />
                                                       <span>Đăng nhập</span>
                                                  </div>
                                             </Link>
                                             <Link to="/dang-ky">
                                                  <div className="flex justify-center items-center text-[#102A83] font-bold gap-2 hover:text-red-500">
                                                       <BiSolidMessageRoundedDetail
                                                            size={20}
                                                            color="#102A83"
                                                       />
                                                       <span>Đăng ký</span>
                                                  </div>
                                             </Link>
                                        </>
                                   ) : (
                                        <>
                                             <div className="flex justify-center items-center text-[#102A83] font-bold gap-2 hover:text-red-500 text-lg">
                                                  <FaUser
                                                       size={20}
                                                       color="#102A83"
                                                  />
                                                  <span>
                                                       <Popconfirm
                                                            placement="bottomRight"
                                                            title="Đăng xuất"
                                                            description="Bạn có muốn đăng xuất không?"
                                                            okText="Có"
                                                            onConfirm={() => {
                                                                 cookiesService.removeCookie(
                                                                      "token"
                                                                 );
                                                                 cookiesService.removeCookie(
                                                                      "userAuth"
                                                                 );
                                                                 setUserLogin(
                                                                      undefined
                                                                 );
                                                                 navigate(
                                                                      "/dang-nhap"
                                                                 );
                                                            }}
                                                            cancelText="Không"
                                                       >
                                                            {
                                                                 (
                                                                      userLogin as ICustomer
                                                                 ).customerName
                                                            }
                                                       </Popconfirm>
                                                  </span>
                                             </div>
                                        </>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>
               <Anchor
                    direction="horizontal"
                    className="flex-1 bg-[#102a83] !w-full  !text-white"
                    items={MenuUser}
               />
          </>
     );
}

export default HeaderUserComponent;
