import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { booking, confirmBooking } from "../controllers/booking.controller";

/**
 * @description AuthLoginRouter
 */
class BookingRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.post("/", catchAsync(booking));
        this.router.post("/confirm", catchAsync(confirmBooking));
    }
}

export default new BookingRouter().router;
