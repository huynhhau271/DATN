import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import { getAllVaccine, saveVaccine } from "../controllers/vaccine.controller";

class VaccineRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.get("/", catchAsync(getAllVaccine));
        this.router.post("/", catchAsync(saveVaccine));
    }
}

export default new VaccineRouter().router;
