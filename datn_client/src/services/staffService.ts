import baseRequest from "./baseRequest";

class StaffService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "/staff";
     async getAllStaff(page: number, limit: number, search: string) {
          const response = await baseRequest.get(this.BasseUrl, {
               params: { page, limit, search },
          });
          return response.data;
     }
}

export const staffService = new StaffService();
