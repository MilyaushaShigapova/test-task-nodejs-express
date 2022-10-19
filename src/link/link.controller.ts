import { NextFunction, Request, Response } from "express";
import { linksService } from "./link.service";
import { LinksCreateDto, LinksQueryDto } from "./link.dto";
import { RequestWithUserInterface } from "../auth/auth.middleware";

class LinksController {
  public async getAll(
    req: RequestWithUserInterface,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query: LinksQueryDto = req.query;

      const data = await linksService.getAll(query, req.userId || "");

      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: RequestWithUserInterface,
    res: Response,
    next: NextFunction
  ) {
    try {
      const params: LinksCreateDto = req.body;

      const data = await linksService.create(params, req.userId || "");

      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async redirect(req: Request, res: Response, next: NextFunction) {
    try {
      const { key } = req.params;

      const url = await linksService.getOne(key);

      return res.redirect(url);
    } catch (e) {
      next(e);
    }
  }
}

export const linksController = new LinksController();
