import axios from "axios";
import cookiesService from "./cookiesService";

const BASE_URL = import.meta.env.FE_BASE_API_URL;
const TIMEOUT = 60000;
const baseRequest = axios.create({});

baseRequest.interceptors.request.use(async (config) => {
     const token = cookiesService.getFromCookie("token");
     config.headers.Authorization = `Bearer ${token}`;
     config.baseURL = BASE_URL;
     config.timeout = TIMEOUT;
     return config;
});

export default baseRequest;
