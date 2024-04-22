import axios from "axios";

const BASE_URL = import.meta.env.FE_BASE_API_URL;
const TIMEOUT = 60000;
const getToken = () => {};
const baseRequest = axios.create({});

baseRequest.interceptors.request.use(async (config) => {
     const token = getToken();
     config.headers.Authorization = `Bearer ${token}`;
     config.baseURL = BASE_URL;
     config.timeout = TIMEOUT;
     return config;
});

export default baseRequest;
