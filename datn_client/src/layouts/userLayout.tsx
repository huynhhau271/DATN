import { Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import HeaderUserComponent from "../page/headerUser";
import FooterUser from "./../page/footerUser";

const { Header, Content } = Layout;
const UserLayout = () => {
     return (
          <Layout className="fixed top-0 left-0 right-0 bottom-0">
               <Header className=" !h-fit top-0 z-10 !bg-blue-300 border-solid border-[#8f8b8b] border-b-2 flex flex-col items-center w-full">
                    <HeaderUserComponent />
               </Header>
               <Content className="overflow-x-auto site-layout-sub-header-background h-full bg-[#f0f2f5]">
                    <div className="h-full">
                         <Outlet />
                    </div>
                    <div className=" z-10 !bg-white pb-7 w-full">
                         {/* <FooterUser /> */}
                    </div>
               </Content>
          </Layout>
     );
};

export default UserLayout;
