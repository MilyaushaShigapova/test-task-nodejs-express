import { httpRequest } from "./axios";
import { Response } from "./types";
import {
  LinkRequestCreate,
  LinkRequestGet,
} from "../types/request/link.request";
import {
  LinkResponseCreate,
  LinkResponseGet,
} from "../types/response/link.response";

export const apiLinkCreate = (
  params: LinkRequestCreate
): Response<LinkResponseCreate> => {
  return httpRequest.post("/links/", params);
};

export const apiLinksGet = (
  params: LinkRequestGet
): Response<LinkResponseGet> => httpRequest.get("/links", { params });

export const apiLinkRedirect = (key: string): any =>
  httpRequest.get(`/links/s/${key}`);
