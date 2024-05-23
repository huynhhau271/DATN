import Customer from "../domain/customer.entity";
import { Repository } from "./baseRepository";

class CustomerRepository extends Repository<Customer> {
    constructor() {
        super(Customer);
    }
}
export default new CustomerRepository().repository();
