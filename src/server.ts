import { mongoConnect } from "./config/mongo.config";
import { PORT } from "./config/env.config";
import { logger } from "./logger";
import express, { Express } from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import * as path from "path";
import { SESSION_SECRET } from "./config/env.config";
import { linkRoutes } from "./link/link.route";
import { sessionStore } from "./config/mongoStore.config";
import * as cron from "node-cron";
import mongoDropTask from "./config/mongoDrop.config";
import { exception } from "./exception/exception";

const app: Express = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use(cookieParser());

app.use(
  session({
    name: "short_link",
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: sessionStore(session),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false,
      secure: false,
      path: "/",
      sameSite: false,
    },
  })
);

app.use("/api/links", linkRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});
app.use(exception);

const task = cron.schedule("0  0 * * *", () => {
  console.log("running a task  ежедневно в 00:00");
  mongoDropTask();
});

(async () => {
  try {
    await mongoConnect();
    app.listen(PORT, () => {
      task.start();
      logger.info(`Server RUN in http://localhost:${PORT}`);
    });
  } catch (e) {
    logger.error("Server start error: " + e);
  }
})();
