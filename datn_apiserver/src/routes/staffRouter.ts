import { NextFunction, Request, Response, Router } from "express";
import { BaseRouter } from "./BaseRouter";
import { getAllStaff } from "../controllers/user.controller";

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
        this.router.get("/", getAllStaff);
    }
}

export default new UserRouter().router;
