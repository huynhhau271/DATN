import { IVaccine } from "../models/vaccine.model";
import { uploadImageToFirebase } from "../utils/firebase";
import baseRequest from "./baseRequest";

class VaccineService {
     private BasseUrl = import.meta.env.FE_BASE_API_URL + "vaccine";
     async getAllVaccine(page: number, limit: number, search: string) {
          const response = await baseRequest.get(this.BasseUrl, {
               params: { page, limit, search },
          });
          return response.data;
     }

     async saveVaccine(
          vaccine: IVaccine,
          uploadedImage?: string,
          fileName?: string
     ) {
          let urlPictre = vaccine.picture;
          if (uploadedImage && fileName)
               urlPictre = await uploadImageToFirebase(
                    fileName,
                    uploadedImage,
                    `vaccine/${vaccine.vaccineName?.split(" ").join("_")}`
               );
          const response = await baseRequest.post(this.BasseUrl, {
               ...vaccine,
               picture: urlPictre,
          });
          return response.data;
     }
     async blockOrActiveVaccine(idVaccine: number, isActive: boolean) {
          await baseRequest.get(this.BasseUrl + "/status", {
               params: { idVaccine, isActive },
          });
     }
}

export const vaccineService = new VaccineService();
