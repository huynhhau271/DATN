import { Layout, Menu, Image, Dropdown, Space } from "antd";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { MenuItems } from "../constants/menuItems";
import HeaderComponent from "../page/header";
import { DownOutlined } from "@ant-design/icons";
import { IUser } from "../models/user.model";
import { UserRoles } from "../utils/userRole";
const { Header, Content, Sider } = Layout;

const MainLayout = () => {
     const { userLogin } = useAuthContext();
     if (!userLogin) return <Navigate to="/login" />;
     console.log({ userLogin });

     return (
          <Layout className="fixed top-0 left-0 right-0 bottom-0">
               <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    className="flex flex-col border-solid border-[#3e3e3e] border-r-2 fixed top-0 bottom-0 left-0"
                    theme="light"
               >
                    <div className="logo !bg-white right-0  top-0 left-0 z-10  border-solid border-[#915959] border-b-2 h-20 flex justify-center items-center">
                         <Image
                              className="!h-20 mb-1"
                              preview={false}
                              src="../public/logo.svg"
                         />
                    </div>
                    <Menu
                         theme="light"
                         defaultSelectedKeys={["4"]}
                         className="w-full h-full flex flex-col"
                         style={{
                              backgroundColor: "#",
                              boxSizing: "border-box",
                              marginTop: "20px",
                         }}
                    >
                         <div className=" flex items-start justify-start flex-col gap-4  ml-5">
                              {MenuItems.map((menu) => {
                                   if (menu.children) {
                                        return (
                                             <Dropdown
                                                  menu={{
                                                       items: menu.children,
                                                  }}
                                             >
                                                  <a
                                                       onClick={(e) =>
                                                            e.preventDefault()
                                                       }
                                                  >
                                                       <Space>
                                                            <span>
                                                                 {menu.icon && (
                                                                      <menu.icon />
                                                                 )}
                                                            </span>
                                                            <span className="ml-1">
                                                                 {menu.title}
                                                            </span>
                                                            <DownOutlined />
                                                       </Space>
                                                  </a>
                                             </Dropdown>
                                        );
                                   } else {
                                        return (
                                             <NavLink
                                                  to={menu.link ?? ""}
                                                  className={`flex justify-start items-center gap-3 ${
                                                       (userLogin as IUser)
                                                            .roleName ===
                                                            UserRoles.STAFF &&
                                                       menu.id === "QLNV"
                                                            ? "hidden"
                                                            : ""
                                                  } `}
                                                  key={menu.id}
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
                    </Menu>
               </Sider>
               <Layout className="sticky bottom-0 right-0">
                    <Header
                         className="site-layout-sub-header-background !h-20 sticky top-0 z-10 !bg-blue-300 border-solid border-[#915959] border-b-2 "
                         style={{ padding: 0 }}
                    >
                         <HeaderComponent />
                    </Header>
                    <Content className="overflow-x-auto site-layout-sub-header-background bg-[#f0f2f5]">
                         <Outlet />
                    </Content>
               </Layout>
          </Layout>
     );
};

export default MainLayout;
