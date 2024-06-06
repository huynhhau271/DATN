import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import {
    booking,
    confirmBooking,
    getAllBooking,
    inject,
    payment,
} from "../controllers/booking.controller";
import { veryfyToken } from "../middleware/verifyToken";

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
        this.router.use(veryfyToken);
        this.router.get("/", catchAsync(getAllBooking));
        this.router.put("/payment", catchAsync(payment));
        this.router.put("/inject", catchAsync(inject));
    }
}

export default new BookingRouter().router;
