import { BaseRouter } from "./BaseRouter";
import catchAsync from "../utils/catchAsync";
import {
    activeVaccine,
    getAllVaccine,
    getAllVaccineByMontOld,
    saveVaccine,
} from "../controllers/vaccine.controller";
import { veryfyToken } from "../middleware/verifyToken";

class VaccineRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.get("/bymothOld", getAllVaccineByMontOld);
        this.router.use(veryfyToken);
        this.router.get("/", catchAsync(getAllVaccine));
        this.router.post("/", catchAsync(saveVaccine));
        this.router.get("/status", catchAsync(activeVaccine));
    }
}

export default new VaccineRouter().router;
