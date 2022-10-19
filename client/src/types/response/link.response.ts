import { LinkEntity } from "../../entities/link.entity";
import { PaginationType } from "./base.response";

export interface LinkResponseCreate {
  id: number;
  short: string;
  link: string;
}

export interface LinkResponseGet {
  items: LinkEntity[];
  paging: PaginationType;
}
