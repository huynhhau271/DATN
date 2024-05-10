import Vaccine from "../domain/vaccine.entity";
import { Repository } from "./baseRepository";

class VaccineRepository extends Repository<Vaccine> {
    constructor() {
        super(Vaccine);
    }
}
export default new VaccineRepository().repository();
