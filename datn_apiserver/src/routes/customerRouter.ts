import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { booking, confirmBooking } from "../controllers/booking.controller";
import {
    createCustomer,
    getCustomer,
    getCustomerByEmail,
    trackingCustomer,
} from "../controllers/customer.controller";
import { veryfyToken } from "../middleware/verifyToken";

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
        this.router.post("/createCustomer", catchAsync(createCustomer));
        this.router.use(veryfyToken);
        this.router.get("/tracking", catchAsync(trackingCustomer));
        this.router.get("/info", catchAsync(getCustomer));
        this.router.get("/getCustomerByEmail", catchAsync(getCustomerByEmail));
    }
}

export default new CustomerRouter().router;
