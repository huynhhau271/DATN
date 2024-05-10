import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import type { MenuProps } from "antd";
import { PiListDashesFill } from "react-icons/pi";
import { TbVaccineBottle } from "react-icons/tb";
import { FaShieldVirus } from "react-icons/fa6";
import { LiaUserNurseSolid } from "react-icons/lia";
export type MenuItems = {
     title: string;
     icon?: IconType;
     link?: string;
     id: string;
     children?: MenuProps["items"];
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
          link: "###",
          id: "vaccination",
          icon: PiListDashesFill,
     },
     {
          title: "Nhân Viên Y Tế",
          link: "###",
          id: "healthcare_staff",
          icon: LiaUserNurseSolid,
     },
     {
          title: "Bệnh",
          link: "###",
          id: "diseases",
          icon: FaShieldVirus,
     },
];
