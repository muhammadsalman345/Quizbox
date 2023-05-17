import { Stack, StackProps } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  props?: StackProps;
}
export default function RowContainer({ children, props }: IProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      {...props}
      alignItems="center"
      justifyContent="flex-start"
    >
      {children}
    </Stack>
  );
}
