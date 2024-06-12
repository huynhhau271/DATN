import { Outlet } from "react-router-dom";
import HeaderUserComponent from "../page/headerUser";
import FooterUser from "./../page/footerUser";
import { MdPhoneInTalk } from "react-icons/md";
const UserLayout = () => {
     return (
          <div className="h-full w-full absolute top-0 bottom-0 left-0 right-0">
               <div>
                    <HeaderUserComponent />
               </div>
               <div className="flex justify-between flex-col h-full ">
                    <div className="h-full mb-5 overflow-x-auto ">
                         <Outlet />
                    </div>
                    <div className="flex justify-center items-center gap-2 absolute z-50 right-12 bg-yellow-300 bottom-24 p-2 rounded-2xl">
                         <div className="bg-[#E3EBFD] rounded-full h-9 w-9 flex items-center justify-center">
                              <MdPhoneInTalk size={20} color="#102A83" />
                         </div>
                         <div className="text-[#102A83] font-bold backdrop:flex flex-col justify-center items-start gap- leading-6">
                              <p>Liên hệ ngay</p>
                              <p className="text-[#e73b3b] font-bold">
                                   0905.470.207
                              </p>
                         </div>
                    </div>
                    <div className="w-full mb-5">
                         <FooterUser />
                    </div>
               </div>
          </div>
     );
};

export default UserLayout;
