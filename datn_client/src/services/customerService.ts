import baseRequest from "./baseRequest";

class CustomerService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "customer/info";
     async getCustomerByInfo({ email, name, dob }: any) {
          const response = await baseRequest.post(this.BasseUrl, {
               email,
               name,
               dob,
          });
          return response.data;
     }
}

export const customerService = new CustomerService();
