import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { BiaxialChart } from "../../../shared";

export default function UserGroupSummaryChartCard() {
  return (
    <Stack
      bgcolor={(theme) => theme.palette.background.paper}
      padding={2}
      width="100%"
      boxShadow={(theme) => `3px 3px 3px ${theme.palette.action.hover}`}
      minHeight="240px"
      borderRadius={(theme) => theme.spacing(1)}
      spacing={1}
    >
      <Stack
        padding={1.5}
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack>
          <Typography variant="caption">Users</Typography>
          <Typography variant="body1" fontSize={(theme) => theme.spacing(2.5)}>
            2,76k
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="caption">Groups</Typography>
          <Typography variant="body1" fontSize={(theme) => theme.spacing(2.5)}>
            6,24k
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <BiaxialChart />
    </Stack>
  );
}
