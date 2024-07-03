import { Request, Response, Router } from "express";
import { config } from "dotenv";
import authRouter from "./auth.route";
import collectionRouter from "./collection.route/index.router";
import classRouter from "./class.route/index.route";
import adminRouter from "./admin.route";
const appRouter = Router();

// * router

// * authentication routers
appRouter.use("/auth", authRouter);
appRouter.use("/class", classRouter);

appRouter.use("/collection", collectionRouter);
appRouter.use("/admin", adminRouter);

export default appRouter;
