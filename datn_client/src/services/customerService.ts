import { toast } from "react-toastify";
import { ICustomer } from "../models/ICustomer";
import baseRequest from "./baseRequest";
import { AxiosError } from "axios";

class CustomerService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL;

     async create(customer: ICustomer) {
          try {
               const response = await baseRequest.post(this.BasseUrl + 'customer/createCustomer', customer);
               toast.success('Đăng ký tài khoản thành công');
               return response.data;
          } catch (error: AxiosError | any) {
               if (error.response) {
                    toast.error(error.response.data.message);
               } else {
                    toast.error("Đăng Ký Tiêm Chủng Thất Bại");
               }
          }

     }

     async getCustomerByInfo({ email, name, dob }: any) {
          const response = await baseRequest.post(
               this.BasseUrl + "customer/info",
               {
                    email,
                    name,
                    dob,
               }
          );
          return response.data;
     }

     async getCustomerByEmail({ email }: any) {
          const response = await baseRequest.post(
               this.BasseUrl + "customer/getCustomerByEmail",
               {
                    email
               }
          );
          return response.data;
     }

     async getCustomerTracking({ email, fullName, dob }: any) {
          const response = await baseRequest.post(
               `${this.BasseUrl}customer/tracking`,
               {
                    email,
                    fullName,
                    dob,
               }
          );
          return response.data;
     }
          
}

export const customerService = new CustomerService();
