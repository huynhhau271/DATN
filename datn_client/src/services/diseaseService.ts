import { IDisease } from "../models/disease.model";
import baseRequest from "./baseRequest";

class DiseaseService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "disease";

     async getALlDisease(page: number, limit: number, search: string) {
          const response = await baseRequest.get(this.BasseUrl, {
               params: { page, limit, search },
          });
          return response.data;
     }
     async saveDisease(disease: IDisease) {
          const response = await baseRequest.post(this.BasseUrl, disease);
          return response.data;
     }

     async deleteDisease(diseaseId: number) {
          const response = await baseRequest.delete(this.BasseUrl, {
               params: { diseaseId },
          });
          return response.data;
     }
}

export const diseaseService = new DiseaseService();
