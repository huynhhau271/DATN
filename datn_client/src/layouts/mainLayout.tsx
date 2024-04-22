import { Collapse, Layout, Menu, Image, Button } from "antd";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { MenuItems } from "../constants/menuItems";
import { AiOutlineLogout } from "react-icons/ai";
import cookiesService from "../services/cookiesService";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../page/header";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
     const { userLogin } = useAuthContext();
     const navigate = useNavigate();
     if (!userLogin) return <Navigate to="/login" />;
     const { Panel } = Collapse;
     const handleLogout = () => {
          cookiesService.removeCookie("token");
          cookiesService.removeCookie("userAuth");
          navigate("/login");
     };
     return (
          <Layout className="fixed top-0 left-0 right-0 bottom-0">
               <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    className="flex flex-col border-solid border-[#3e3e3e] border-r-2 fixed top-0 bottom-0 left-0"
                    theme="light"
               >
                    <div className="logo bg-[#ffffff] right-0  top-0 left-0 z-10  border-solid border-[#915959] border-b-2 h-20">
                         <Image
                              className="w-full"
                              preview={false}
                              src="../public/logo.svg"
                         />
                    </div>
                    <Menu
                         theme="light"
                         mode="inline"
                         defaultSelectedKeys={["4"]}
                         className="w-full h-full"
                         style={{
                              backgroundColor: "#",
                              boxSizing: "border-box",
                              marginTop: "20px",
                         }}
                    >
                         <div className=" flex flex-col gap-4  ml-5">
                              {MenuItems.map((menu) => {
                                   if (menu.children) {
                                        return (
                                             <Collapse
                                                  key={menu.id}
                                                  className="w-full mt-6"
                                                  expandIconPosition="right"
                                                  ghost
                                             >
                                                  {menu.children.map(
                                                       (child) => {
                                                            return (
                                                                 <Panel
                                                                      header={
                                                                           menu.title
                                                                      }
                                                                      key={
                                                                           child.id
                                                                      }
                                                                 >
                                                                      <NavLink
                                                                           to={
                                                                                child.link ??
                                                                                ""
                                                                           }
                                                                      >
                                                                           {child.icon ? (
                                                                                <span>
                                                                                     <child.icon />
                                                                                </span>
                                                                           ) : (
                                                                                <>

                                                                                </>
                                                                           )}
                                                                           <span>
                                                                                {child.title ||
                                                                                     ""}
                                                                           </span>
                                                                      </NavLink>
                                                                 </Panel>
                                                            );
                                                       }
                                                  )}
                                             </Collapse>
                                        );
                                   } else {
                                        return (
                                             <NavLink
                                                  to={menu.link ?? ""}
                                                  className="flex justify-start items-center gap-3"
                                             >
                                                  {menu.icon ? (
                                                       <span>
                                                            <menu.icon />
                                                       </span>
                                                  ) : (
                                                       <></>
                                                  )}
                                                  <span>
                                                       {menu.title || ""}
                                                  </span>
                                             </NavLink>
                                        );
                                   }
                              })}
                         </div>

                         <Button
                              className="absolute bottom-0 left-0 mb-1 w-full text-xl gap-2
                              border-none flex justify-center"
                              danger
                              block
                              type="primary"
                              onClick={handleLogout}
                         >
                              <AiOutlineLogout className="h-full mt-1" />
                              <span>LogOut</span>
                         </Button>
                    </Menu>
               </Sider>
               <Layout className="sticky bottom-0 right-0">
                    <Header
                         className="site-layout-sub-header-background h-20 sticky top-0 z-10"
                         style={{ padding: 0 }}
                    >
                         <HeaderComponent />
                    </Header>
                    <Content className="overflow-x-auto site-layout-sub-header-background">
                         <Outlet />
                    </Content>
               </Layout>
          </Layout>
     );
};

export default MainLayout;
