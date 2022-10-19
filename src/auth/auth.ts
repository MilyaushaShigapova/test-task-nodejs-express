import { NextFunction, Response, Request } from "express";
import session, { Session } from "express-session";
import ShortUniqueId from "short-unique-id";
import { userService } from "../user/user.service";

type SessionUuid = {
  uuid?: string;
};

export interface RequestWithUserInterface extends Request {
  userId?: string;
  session: Session & Partial<session.SessionData> & SessionUuid;
}

export async function authMiddleware(
  req: RequestWithUserInterface,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    if (!req.session.uuid) {
      req.session.uuid = new ShortUniqueId({ length: 10 })().toString();
      req.session.save();
    }

    const uuid = req.session.uuid ? req.session.uuid : "s";

    let user = await userService.getOne(uuid || "");

    if (!user) {
      await userService.create(uuid || "");
      user = await userService.getOne(uuid || "");
    }
    req.userId = user?._id.toString() || "";

    req.session.save();

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Что-то пошло не так!" });
  }
}
