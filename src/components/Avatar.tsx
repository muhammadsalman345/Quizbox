import { Stack } from "@mui/material";
import React from "react";

export default function Avatar() {
  return (
    <Stack
      width="40px"
      height="40px"
      borderRadius="100%"
      border={(theme) => `1px solid ${theme.palette.action.hover}`}
      bgcolor={(theme) => theme.palette.action.hover}
    ></Stack>
  );
}
