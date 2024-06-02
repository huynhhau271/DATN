import { Repository } from "./baseRepository";
import HealtSheet from "../domain/healtSheet.entity";

class HealtSheetRepository extends Repository<HealtSheet> {
    constructor() {
        super(HealtSheet);
    }
}
export default new HealtSheetRepository().repository();
