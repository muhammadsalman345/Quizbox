import { Stack } from "@mui/material";
import React from "react";
import resources from "../resources";

export default function NoDataView() {
  return (
    <Stack
      width="400px"
      height="400px"
      borderRadius={(theme) => theme.spacing(1)}
      alignSelf="center"
      overflow="hidden"
    >
      <img src={resources.nodata_woman} alt="no-data-png" />
    </Stack>
  );
}
