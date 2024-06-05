import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import type { MenuProps } from "antd";
import { PiListDashesFill } from "react-icons/pi";
import { TbVaccineBottle } from "react-icons/tb";
import { FaShieldVirus } from "react-icons/fa6";
import { LiaUserNurseSolid } from "react-icons/lia";
type MenuItems = {
     title: string;
     icon?: IconType;
     link?: string;
     id: string;
     children?: MenuProps["items"];
};
type MenuUser = {
     key: string;
     href: string;
     title: string;
};
export const MenuItems: MenuItems[] = [
     {
          title: "Trang chủ",
          icon: FaHome,
          id: "index",
          link: "/admin",
     },
     {
          title: "Nhân Viên",
          id: "QLNV",
          icon: FaHouseUser,
          link: "/admin/nhanvien",
     },
     {
          title: "Vaccine",
          link: "/admin/vaccine",
          id: "vaccine",
          icon: TbVaccineBottle,
     },
     {
          title: "Danh Sách Tiêm Chủng",
          link: "/admin/booking",
          id: "vaccination",
          icon: PiListDashesFill,
     },
     {
          title: "Bệnh Học",
          link: "/admin/disease",
          id: "diseases",
          icon: FaShieldVirus,
     },
];
export const MenuUser: MenuUser[] = [
     {
          key: "contact",
          href: "/trang-chu",
          title: "Trang chủ",
     },
     {
          key: "introduce",
          href: "/gioi-thieu",
          title: "Giới Thiệu",
     },
     {
          key: "vaccine",
          href: "/vac-xin",
          title: "Vắc Xin",
     },
     {
          key: "vaccination",
          href: "/lich-tiem-chung",
          title: "Lịch tiêm vacxin",
     },
     {
          key: "news",
          href: "/#tin-tuc",
          title: "Tin Tức",
     },
     {
          key: "center",
          href: "/#trung-tam",
          title: "Về Trung Tâm",
     },
];
