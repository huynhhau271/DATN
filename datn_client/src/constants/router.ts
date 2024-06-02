import MainLayout from "../layouts/mainLayout";
import DashboadPage from "../page/dashboad";
import { LoginPage } from "../page/login";
import EmployeeManagerPage from "../page/staff";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import VaccineManagerPage from "../page/vaccine";
import DiseaseManagerPage from "../page/disease";
import UserLayout from "../layouts/userLayout";
import Booking from "../page/booking";
import BookingManagerPage from "../page/bookingManager";
import { TrackingPage } from "../page/trackingPage";

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
               {
                    path: "/admin/disease",
                    id: "disease",
                    Component: DiseaseManagerPage,
               },
               {
                    path: "/admin/booking",
                    id: "booking",
                    Component: BookingManagerPage,
               },
          ],
     },
     {
          path: "/",
          id: "user",
          children: [
               {
                    path: "/dang-ky-tiem-chung",
                    id: "tiem-chung",
                    Component: Booking,
               },
               {
                    path: "/so-theo-gioi",
                    id: "tracking",
                    Component: TrackingPage,
               },
          ],
          Component: UserLayout,
     },
     {
          path: "/login",
          id: "login",
          Component: LoginPage,
     },
];
export default createBrowserRouter(routers);
