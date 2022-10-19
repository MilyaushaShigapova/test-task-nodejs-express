import mongoose, { ConnectOptions } from "mongoose";
import { logger } from "../logger";
import { MONGO_URI } from "./env.config";

export const mongoConnect = async () => {
  try {
    await mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        logger.info(`MongoDB connected to ${MONGO_URI}`);
      });
  } catch (e) {
    logger.error("MongoDB connect ERROR:  " + e);
  }
};
