import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import type { MenuProps } from "antd";
import { MdDiscount } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdPriceCheck } from "react-icons/md";
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
          icon: MdPriceCheck,
     },
     {
          title: "Danh Sách Tiêm Chủng",
          link: "###",
          id: "vaccination",
          icon: MdDiscount,
     },
     {
          title: "Nhân Viên Y Tế",
          link: "###",
          id: "healthcare_staff",
          icon: FaFileInvoiceDollar,
     },
];
