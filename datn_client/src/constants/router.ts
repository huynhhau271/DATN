import MainLayout from "../layouts/mainLayout";
import DashboadPage from "../page/dashboad";
import { LoginPage } from "../page/login";
import EmployeeManagerPage from "../page/staff";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import VaccineManagerPage from "../page/vaccine";

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
                    path: "/admin/vaccine",
                    id: "vaccine",
                    Component: VaccineManagerPage,
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
