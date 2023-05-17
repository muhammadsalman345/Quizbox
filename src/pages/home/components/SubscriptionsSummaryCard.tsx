import { colors, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import React from "react";

export default function SubscriptionsSummaryCard() {
  return (
    <Stack
      padding={2}
      borderRadius={(theme) => theme.spacing(1)}
      spacing={0.85}
      width="100%"
      bgcolor={(theme) => theme.palette.background.paper}
      boxShadow={(theme) => `3px 3px 3px ${theme.palette.action.hover}`}
    >
      <Typography variant="body1">Premium Users</Typography>
      <Stack
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        })}
        width="100%"
        direction="row"
        spacing={1}
      >
        <Stack padding={(theme) => theme.spacing(0.85, 0)}>
          <Typography variant="body2" color={colors.grey[700]}>
            This month
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            250
          </Typography>
          <Stack marginTop={1} />
          <Typography variant="caption" color={colors.grey[500]}>
            0.2% more that last month
          </Typography>
        </Stack>

        <Stack
          padding={0.85}
          alignItems="center"
          justifyContent="center"
          width="80px"
          height="80px"
        >
          <CircularProgress color={colors.green[400]} value={30} size="80px" />
        </Stack>
      </Stack>
    </Stack>
  );
}
