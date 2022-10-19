import { apiLinkCreate, apiLinksGet } from "../api";
import { toast } from "react-toastify";
import {
  LinkRequestCreate,
  LinkRequestGet,
} from "../types/request/link.request";

class LinkService {
  async getAll(queryParams: LinkRequestGet) {
    try {
      const response = await apiLinksGet(queryParams);

      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async create(par: LinkRequestCreate) {
    try {
      const response = await apiLinkCreate(par);

      toast.success("Ссылка создана успешно!", { toastId: "create_link" });

      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export const linkService = new LinkService();
