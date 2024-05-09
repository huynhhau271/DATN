import { IUser } from "../models/user.model";
import baseRequest from "./baseRequest";

class StaffService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "/staff";

     async getAllStaff(page: number, limit: number, search: string) {
          const response = await baseRequest.get(this.BasseUrl, {
               params: { page, limit, search },
          });
          return response.data;
     }

     async getAllStaffById(idstaff: number) {
          const response = await baseRequest.get(`${this.BasseUrl}/${idstaff}`);
          return response.data;
     }

     async blockOrActiveUser(idStaff: number, isActive: boolean) {
          await baseRequest.get(this.BasseUrl + "/active", {
               params: { idStaff, isActive },
          });
     }

     async createUser(user: IUser) {
          const response = await baseRequest.post(this.BasseUrl, user);
          return response.data;
     }

     async updateStaff(user: IUser) {
          const response = await baseRequest.put(this.BasseUrl, user);
          return response.data;
     }
}

export const staffService = new StaffService();
