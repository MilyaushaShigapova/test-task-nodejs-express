import { ITableHeadCells } from "./types";
import { IconButton, styled, Tooltip } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { REDIRECT_URI } from "../../api/api.config";
import { useState } from "react";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";

const ShortLink = styled("a")(() => ({
  width: "100%",
  display: "block",
}));

type Props = {
  link: string;
};

const ClipBoard = ({ link }: Props) => {
  const [copied, setCopied] = useState(false);

  return (
    <CopyToClipboard text={REDIRECT_URI + link} onCopy={() => setCopied(true)}>
      <Tooltip title="Копировать в буфер обмена">
        <IconButton>
          <CopyAllOutlinedIcon sx={{ color: copied ? "#7b6bfc" : "#0a4efc" }} />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
};

export const drawCell = (row: any, cell: ITableHeadCells) => {
  switch (cell.type) {
    case "link":
      return <span>{row[cell.field]}</span>;
    case "short-link":
      return (
        <ShortLink
          href={REDIRECT_URI + row[cell.field]}
          rel="noreferrer"
          target="_blank"
        >
          {row[cell.field]}
        </ShortLink>
      );
    case "copy":
      return <ClipBoard link={row[cell.field]} />;
    default:
      return null;
  }
};
