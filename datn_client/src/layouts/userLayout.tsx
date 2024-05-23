import { Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import HeaderUserComponent from "../page/headerUser";
const { Header, Content } = Layout;
const UserLayout = () => {
     return (
          <Layout className="fixed top-0 left-0 right-0 bottom-0">
               <Header className="site-layout-sub-header-background !h-fit top-0 z-10 !bg-blue-300 border-solid border-[#8f8b8b] border-b-2 flex flex-col items-center">
                    <HeaderUserComponent />
               </Header>
               <Content className="overflow-x-auto site-layout-sub-header-background bg-[#f0f2f5]">
                    <Outlet />
               </Content>
               <Footer className="site-layout-sub-header-background h-fit sticky top-0 z-10 !bg-white border-solid ">
                    Footer
               </Footer>
          </Layout>
     );
};

export default UserLayout;
