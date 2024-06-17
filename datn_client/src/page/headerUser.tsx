import { Anchor, Avatar, Dropdown, Image, MenuProps } from "antd";
import { MenuUser } from "../constants/menuItems";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import Search from "antd/es/input/Search";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { ICustomer } from "../models/ICustomer";
import cookiesService from "../services/cookiesService";
import {
     UserOutlined,
     CaretDownOutlined,
     PoweroffOutlined,
     ProfileOutlined,
} from "@ant-design/icons";
function HeaderUserComponent() {
     const { userLogin } = useAuthContext();
     const navigate = useNavigate();
     const handleLogout = () => {
          cookiesService.removeCookie("token");
          cookiesService.removeCookie("userAuth");
          navigate("/login");
     };
     const items: MenuProps["items"] = [
          {
               key: "1",
               label: (
                    <Link
                         to={"/cap-nhat-thong-tin"}
                         className="flex items-center gap-2"
                    >
                         <ProfileOutlined /> Cập Nhật Thông Tin
                    </Link>
               ),
          },
          {
               key: "2",
               label: (
                    <p
                         className="flex gap-2 text-red-600"
                         onClick={handleLogout}
                    >
                         <PoweroffOutlined /> Đăng Xuất
                    </p>
               ),
          },
     ];

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
                                             <Dropdown
                                                  menu={{ items }}
                                                  className="mr-4"
                                             >
                                                  <div className="flex justify-center items-center text-[#102A83]  gap-2 hover:text-red-500 text-lg">
                                                       <Avatar
                                                            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                                                            size="large"
                                                            icon={
                                                                 <UserOutlined />
                                                            }
                                                       />
                                                       <div className="flex gap-1 items-center">
                                                            <p className="font-bold">
                                                                 Xin Chào
                                                            </p>
                                                            <p>
                                                                 {
                                                                      (
                                                                           userLogin as ICustomer
                                                                      )
                                                                           .parentsName
                                                                 }
                                                            </p>
                                                            <CaretDownOutlined />
                                                       </div>
                                                  </div>
                                             </Dropdown>
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
