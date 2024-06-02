import { BaseRouter } from "./BaseRouter";
import {
    activeUser,
    getAllStaff,
    getStaffs,
    saveStaff,
} from "../controllers/user.controller";
import catchAsync from "../utils/catchAsync";
import { veryfyToken } from "../middleware/verifyToken";

/**
 * @description AuthLoginRouter
 */
class UserRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.use(veryfyToken);
        this.router.get("/", catchAsync(getAllStaff));
        this.router.post("/", catchAsync(saveStaff));
        this.router.put("/", catchAsync(saveStaff));
        this.router.get("/active", catchAsync(activeUser));
        this.router.get("/staffs", catchAsync(getStaffs));
    }
}

export default new UserRouter().router;
