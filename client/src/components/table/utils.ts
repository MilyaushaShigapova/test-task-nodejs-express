import { ITableHeadCells } from "./types";

export const linksTableHeadCells: ITableHeadCells[] = [
  {
    title: "Короткая ссылка",
    field: "short",
    type: "short-link",
    align: "left",
  },
  { title: "Исходная ссылка", field: "link", type: "link", align: "left" },
  {
    title: "Копировать короткую ссылку",
    field: "short",
    type: "copy",
    align: "left",
  },
];
