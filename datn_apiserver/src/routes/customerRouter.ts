import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { booking, confirmBooking } from "../controllers/booking.controller";
import {
    createCustomer,
    getAllCustomerByInfor,
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
        this.router.post("/info", catchAsync(getAllCustomerByInfor));
        this.router.post("/createCustomer", catchAsync(createCustomer));
        this.router.post("/tracking", catchAsync(trackingCustomer));
        this.router.use(veryfyToken);
        this.router.get("/getCustomerByEmail", catchAsync(getCustomerByEmail));
    }
}

export default new CustomerRouter().router;
