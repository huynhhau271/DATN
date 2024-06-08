import baseRequest from "./baseRequest";

class CustomerService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL;
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
