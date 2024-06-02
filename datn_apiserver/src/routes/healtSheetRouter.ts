import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { getAllProvince } from "../controllers/province.controller";
import {
    deleteDisease,
    getAllDisease,
    saveDisease,
} from "../controllers/disease.controller";
import { veryfyToken } from "../middleware/verifyToken";
import { physicalExamination } from "../controllers/healtSheet.controller";

/**
 * @description AuthLoginRouter
 */
class HealtSheetRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.use(veryfyToken);
        this.router.post("/", catchAsync(physicalExamination));
    }
}

export default new HealtSheetRouter().router;
