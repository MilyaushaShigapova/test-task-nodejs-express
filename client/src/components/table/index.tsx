import React, { memo, MouseEvent } from "react";
import { ITableHeadCells } from "./types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { drawCell } from "./drawCell";

interface TableProProps {
  headCells: ITableHeadCells[];
  rows: any[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  setRowsPerPage: (p: number) => void;
  setPage: (p: number) => void;
}

export const TablePro: React.FC<TableProProps> = memo(
  ({
    headCells,
    rows,
    totalCount,
    page,
    rowsPerPage,
    setRowsPerPage,
    setPage,
  }) => {
    const handleChangePage = (
      event: MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(1);
    };
    return (
      <>
        <TableContainer component={Paper} sx={{ width: "80%", ml: "10%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headCells.map((cell) => {
                  return (
                    <TableCell align={cell.align || "left"}>
                      <span>{cell.title}</span>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {headCells.map((cell) => {
                    return (
                      <TableCell
                        key={cell.field}
                        align={cell.align || "left"}
                        sx={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxWidth: "300px",
                        }}
                      >
                        {drawCell(row, cell)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={totalCount}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Строк на странице"
          />
        </TableContainer>
      </>
    );
  }
);
