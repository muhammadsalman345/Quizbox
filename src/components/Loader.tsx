import React from "react";
import { Backdrop, Stack } from "@mui/material";

//
interface IProps {
  label?: string;
  open: boolean;
}
export default function Loader({ open, label }: IProps) {
  return (
    <Backdrop
      sx={(theme) => ({
        zIndex: 1010,
        bgcolor: `rgba(211,211,211,0.65)`,
      })}
      open={open}
    >
      <Stack>
        <span className="loader"></span>
      </Stack>
    </Backdrop>
  );
}
