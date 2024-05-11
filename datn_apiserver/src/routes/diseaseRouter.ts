import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { getAllProvince } from "../controllers/province.controller";
import {
    deleteDisease,
    getAllDisease,
    saveDisease,
} from "../controllers/disease.controller";

/**
 * @description AuthLoginRouter
 */
class DiseaseRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.get("/", catchAsync(getAllDisease));
        this.router.post("/", catchAsync(saveDisease));
        this.router.delete("/", catchAsync(deleteDisease));
    }
}

export default new DiseaseRouter().router;
