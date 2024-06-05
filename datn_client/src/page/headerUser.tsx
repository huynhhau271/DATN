import { Anchor, Image } from "antd";
import { MenuUser } from "../constants/menuItems";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { MdPhoneInTalk } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import Search from "antd/es/input/Search";
import { Link } from "react-router-dom";

function HeaderUserComponent() {
     return (
          <>
               <div className="flex-1 flex justify-between items-center w-full gap-56">
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
                         <div className="flex gap-10">
                              <Link to="/dang-ky-tiem-chung">
                                   <div className="flex justify-center items-center text-[#102A83] font-bold gap-2 hover:text-white hover:cursor-pointer">
                                        <FaCalendarAlt
                                             size={20}
                                             color="#102A83"
                                        />
                                        <span>Đặt Lịch Tiêm</span>
                                   </div>
                              </Link>
                              <div className="flex justify-center items-center text-[#102A83] font-bold gap-2 hover:text-white">
                                   <BiSolidMessageRoundedDetail
                                        size={20}
                                        color="#102A83"
                                   />
                                   <span>Tư Vấn</span>
                              </div>
                              <div className="flex justify-center items-center  gap-2">
                                   <div className="bg-[#E3EBFD] rounded-full h-9 w-9 flex items-center justify-center">
                                        <MdPhoneInTalk
                                             size={20}
                                             color="#102A83"
                                        />
                                   </div>
                                   <div className="text-[#102A83] font-bold backdrop:flex flex-col justify-center items-start gap- leading-6">
                                        <p>Liên hệ với chúng tôi 24/7</p>
                                        <p className="text-[#e73b3b] font-bold">
                                             0905.470.207 - 0795.194.082
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <Anchor
                    direction="horizontal"
                    className="flex-1 bg-[#102a83] !w-screen  !text-white"
                    items={MenuUser}
               />
          </>
     );
}

export default HeaderUserComponent;
