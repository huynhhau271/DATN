import { toast } from "react-toastify";
import { ICustomer } from "../models/ICustomer";
import baseRequest from "./baseRequest";
import { AxiosError } from "axios";

class CustomerService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL;

     async create(customer: ICustomer) {
          try {
               const response = await baseRequest.post(
                    this.BasseUrl + "customer/createCustomer",
                    customer
               );
               toast.success("Đăng ký tài khoản thành công");
               return response.data;
          } catch (error: AxiosError | any) {
               if (error.response) {
                    toast.error(error.response.data.message);
               } else {
                    toast.error("Đăng Ký Tiêm Chủng Thất Bại");
               }
          }
     }

     async getCustomer() {
          const response = await baseRequest.get(
               this.BasseUrl + "customer/info"
          );
          return response.data;
     }

     async getCustomerByEmail() {
          const response = await baseRequest.get(
               this.BasseUrl + "customer/getCustomerByEmail"
          );
          return response.data;
     }

     async getCustomerTracking() {
          const response = await baseRequest.get(
               `${this.BasseUrl}customer/tracking`
          );
          return response.data;
     }

     async getCustomerById(id: number) {
          const response = await baseRequest.get(
               `${this.BasseUrl}customer/byId`,
               {
                    params: { id },
               }
          );
          return response.data;
     }

     async updateCustomer(customer: ICustomer) {
          const response = await baseRequest.put(
               `${this.BasseUrl}customer/`,
               customer
          );
          return response.data;
     }
}

export const customerService = new CustomerService();
