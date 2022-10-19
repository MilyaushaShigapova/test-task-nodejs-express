import { createClient } from "redis";
import { redisConfig } from "./env.config";
import expressRedisCache from "express-redis-cache";
import { logger } from "../logger";

export const redisClient = createClient(redisConfig);

redisClient.on("error", (error) => {
  if (error) {
    logger.error("Redis ERROR:  ", error);
  } else {
    logger.info("Redis connect.");
  }
});

export const redisCache = expressRedisCache({
  expire: 10,
});
