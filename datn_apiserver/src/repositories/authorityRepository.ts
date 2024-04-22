import Authority from "../domain/authority.entity";
import User from "../domain/user.entity";
import { Repository } from "./baseRepository";

class AuthorityRepository extends Repository<Authority> {
    constructor() {
        super(Authority);
    }
}
export default new AuthorityRepository().repository();
