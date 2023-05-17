import TableCell, { TableCellProps } from "@mui/material/TableCell/TableCell";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode | string;
  props?: TableCellProps;
}
export default function CustomTableCell({ children, props }: IProps) {
  return (
    <TableCell
      sx={(theme) => ({
        fontSize: theme.spacing(1.5),
        padding: theme.spacing(0.85),
      })}
      {...props}
    >
      {children}
    </TableCell>
  );
}
