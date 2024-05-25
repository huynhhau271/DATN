import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { booking, confirmBooking } from "../controllers/booking.controller";
import { getAllCustomerByInfor } from "../controllers/customer.controller";

/**
 * @description AuthLoginRouter
 */
class CustomerRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.post("/info", catchAsync(getAllCustomerByInfor));
    }
}

export default new CustomerRouter().router;
