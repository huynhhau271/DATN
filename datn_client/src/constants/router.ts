import MainLayout from "../layouts/mainLayout";
import CreateUpdateStaff from "../page/createUpdateStaff";
import DashboadPage from "../page/dashboad";
import { LoginPage } from "../page/login";
import EmployeeManagerPage from "../page/staff";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const routers: RouteObject[] = [
     {
          path: "/admin",
          Component: MainLayout,
          id: "main",
          children: [
               {
                    path: "/admin",
                    index: true,
                    id: "dashboad",
                    Component: DashboadPage,
               },
               {
                    path: "/admin/nhanvien",
                    id: "staff",
                    Component: EmployeeManagerPage,
               },
               {
                    path: "/admin/nhanvien/them-moi",
                    id: "createUpdateStaff",
                    Component: CreateUpdateStaff,
               },
          ],
     },
     {
          path: "/login",
          id: "login",
          Component: LoginPage,
     },
];
export default createBrowserRouter(routers);
