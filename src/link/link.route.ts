import { Router } from "express";
import { linksController } from "./link.controller";
import { authMiddleware } from "../auth/auth.middleware";
import { redisCache } from "../config/redis.config";

const linkRoutes = Router();

linkRoutes.get("/", authMiddleware, linksController.getAll);
linkRoutes.post("/", authMiddleware, linksController.create);
linkRoutes.get("/s/:key", redisCache.route(), linksController.redirect);

export { linkRoutes };
