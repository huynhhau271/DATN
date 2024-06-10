import axios from "axios";
import { LoginPayLoad, LoginResponse } from "../models/user.model";
import baseRequest from "./baseRequest";
const baseUrl = import.meta.env.FE_BASE_API_URL;

class AuthService {
     async login(payLoad: LoginPayLoad) {
          const login = await baseRequest.post<LoginResponse>(
               `${baseUrl}authenticate/login`,
               payLoad
          );
          return login.data;
     } 
     
     async loginCustomer(payLoad: LoginPayLoad) {
          const login = await baseRequest.post<LoginResponse>(
               `${baseUrl}authenticate/loginCustomer`,
               payLoad
          );
          return login.data;
     }

     async register(payLoad: LoginPayLoad) {
          const account = await axios.post(
               `${baseUrl}authenticate/register`,
               payLoad
          );
          return account.data;
     }
}
export default new AuthService();
