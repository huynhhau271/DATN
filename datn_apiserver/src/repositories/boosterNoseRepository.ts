import BoosterNose from "../domain/booster-nose.entity";
import { Repository } from "./baseRepository";

class boosterNoseRepository extends Repository<BoosterNose> {
    constructor() {
        super(BoosterNose);
    }
}
export default new boosterNoseRepository().repository();
