import { Table, TableContainer, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React, { ReactNode } from "react";
import CustomTableCell from "../components/CustomTableCell";
import { ITableHeader } from "../pages/home/interface";

interface IProps {
  header: ITableHeader[];
  children?: ReactNode;
  count?: number;
}
export default function TableTemplate({ header, children, count }: IProps) {
  return (
    <TableContainer>
      <Table>
        <TableRow>
          {header.map((th) => (
            <CustomTableCell>{th.children}</CustomTableCell>
          ))}
        </TableRow>
        {Array.from({ length: count ? count : 10 }).map((_, i) => (
          <TableRow
            key={i}
            sx={(theme) => ({
              bgcolor:
                i % 2 === 0
                  ? theme.palette.common.white
                  : theme.palette.action.hover,
            })}
          >
            <CustomTableCell>The name of the school</CustomTableCell>
            <CustomTableCell>Accra Central One</CustomTableCell>
            <CustomTableCell>846</CustomTableCell>
            <CustomTableCell>{dayjs().format("DD/MM/YYYY")}</CustomTableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
}
