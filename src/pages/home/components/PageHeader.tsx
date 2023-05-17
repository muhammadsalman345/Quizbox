import { Stack } from "@mui/material";
import React from "react";
import TabButton from "./TabButton";

export default function PageHeader() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      bgcolor={(theme) => theme.palette.common.white}
      borderRadius={(theme) => theme.spacing(0.45)}
      spacing={1}
      padding={(theme) => theme.spacing(1, 2)}
    >
      {["Schools", "Users", "Groups"].map((tb) => (
        <TabButton current="Schools" title={tb} key={tb} />
      ))}
    </Stack>
  );
}
