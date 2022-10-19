type IAlign = "left" | "right" | "center";

export interface ITableHeadCells {
  align?: IAlign;
  title: string;
  field: string;
  type: "link" | "short-link" | "copy";
  onClick?: (p: any) => void;
  sortClick?: (p: any) => void;
}
