import { Backdrop, Stack } from "@mui/material";
import React from "react";

interface IProps {
  loading: boolean;
}
export default function Loader({ loading }: IProps) {
  return (
    <Backdrop open={loading}>
      <Stack
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <span className="loader"></span>
      </Stack>
    </Backdrop>
  );
}
