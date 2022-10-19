import mongoose from "mongoose";
import { logger } from "../logger";

async function mongoDropTask() {
  mongoose.connection.db.dropDatabase(function (err, result) {
    if (err) logger.error("Drop Mongo DB ERROR:  " + err);
    else logger.info("MongoDb Drop is successful.");
  });
}
export default mongoDropTask;
