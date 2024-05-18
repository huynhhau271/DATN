import { Anchor, Image } from "antd";
import { MenuUser } from "../constants/menuItems";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { MdPhoneInTalk } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import Search from "antd/es/input/Search";

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
                              <div className="flex justify-center items-center text-[#102A83] font-bold gap-2 hover:text-white">
                                   <FaCalendarAlt size={20} color="#102A83" />
                                   <span>Đặt Lịch Tiêm</span>
                              </div>
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
                                   <div className="flex flex-col justify-center items-start gap- leading-6">
                                        <p>HotLine 24/7</p>
                                        <p className="text-[#102A83] font-bold">
                                             0918341155 - (024) 3 2444 086
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
