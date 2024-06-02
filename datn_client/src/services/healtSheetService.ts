import { HealtSheetPayload } from "../models/IHealtSheet";
import baseRequest from "./baseRequest";

class HealtSheetService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "healtSheet";
     async physicalExamination(data: HealtSheetPayload) {
          const response = await baseRequest.post(this.BasseUrl, data);
          return response.data;
     }
}

export const healtSheetService = new HealtSheetService();
