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
import HomeUses from "../page/homeUses";
import IntroduceUsers from "../page/introduceUsers";
import VacxinUsers from "../page/vacxinUsers";
import VaccinationSchedule from "../page/vaccinationSchedule";
import HandBook from "../page/handBook";
import Procedure from "../page/procedure";
import { TrackingPage } from "../page/trackingPage";
import Register from "../page/register";

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
                    path: "/dang-ky",
                    id: "dang-ky",
                    Component: Register,
               },
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
               {
                    path: "/",
                    id: "trang-chu",
                    Component: HomeUses,
                    index: true,
               },
               {
                    path: "/gioi-thieu",
                    id: "gioi-thieu",
                    Component: IntroduceUsers,
               },
               {
                    path: "/vac-xin",
                    id: "vac-xin",
                    Component: VacxinUsers,
               },
               {
                    path: "/lich-tiem-chung",
                    id: "lich-tiem-chung",
                    Component: VaccinationSchedule,
               },
               {
                    path: "/quy-trinh-tiem-chung",
                    id: "quy-trinh-tiem-chung",
                    Component: Procedure,
               },
               {
                    path: "/cam-nang",
                    id: "cam-nang",
                    Component: HandBook,
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
