import Disease from "../domain/disease.entity";
import { Repository } from "./baseRepository";

class diseaseRepository extends Repository<Disease> {
    constructor() {
        super(Disease);
    }
}
export default new diseaseRepository().repository();
