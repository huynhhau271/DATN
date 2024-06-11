import { Outlet } from "react-router-dom";
import HeaderUserComponent from "../page/headerUser";
import FooterUser from "./../page/footerUser";

const UserLayout = () => {
     return (
          <div className="h-full w-full">
               <div>
                    <HeaderUserComponent />
               </div>
               <div className="flex justify-between flex-col h-full ">
                    <div className="h-full mb-5">
                         <Outlet />
                    </div>
                    <div className=" w-full mb-5">
                         <FooterUser />
                    </div>
               </div>
          </div>
     );
};

export default UserLayout;
