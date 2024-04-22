import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
export type MenuItems = {
     title: string;
     icon?: IconType;
     link?: string;
     id: string;
     children?: [MenuItems];
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
          link: "/admin/nhanvien",
          icon: FiUsers,
     },
];
