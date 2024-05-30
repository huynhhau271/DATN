import { IDisease } from "../models/disease.model";
import { uploadImageToFirebase } from "../utils/firebase";
import baseRequest from "./baseRequest";

class DiseaseService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "disease";

     async getALlDisease(page: number, limit: number, search: string) {
          const response = await baseRequest.get(this.BasseUrl, {
               params: { page, limit, search },
          });
          return response.data;
     }
     async saveDisease(
          disease: IDisease,
          uploadedImage?: string,
          fileName?: string
     ) {
          let urlPictre = disease.image;
          if (uploadedImage && fileName)
               urlPictre = await uploadImageToFirebase(
                    fileName,
                    uploadedImage,
                    `disease/${disease.diseaseName?.split(" ").join("_")}`
               );
          const response = await baseRequest.post(this.BasseUrl, {
               ...disease,
               image: urlPictre,
          });
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
