import { colors, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { GrLineChart } from "react-icons/gr";
import { primaryShades } from "../../../constants/AppColors";
import { SummaryInfoCard } from "../../../shared";
import { StatisticsSummaryDummy } from "../data";

export default function StatisticsSummaryCard() {
  return (
    <Stack
      bgcolor={(theme) => theme.palette.background.paper}
      borderRadius={(theme) => theme.spacing(0.85)}
      padding={2}
      component="div"
      sx={(theme) => ({})}
      boxShadow={(theme) => `3px 3px 3px ${theme.palette.action.hover}`}
      minHeight="100px"
    >
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          sx={(theme) => ({
            color: colors.grey[900],
          })}
          variant="body2"
        >
          Statistics
        </Typography>
        <Typography color={colors.grey[500]} variant="caption">
          updated 1 month ago
        </Typography>
      </Stack>
      <Stack
        justifyContent="space-between"
        direction="row"
        padding={(theme) => theme.spacing(2, 0)}
      >
        {StatisticsSummaryDummy.map((ss) => (
          <SummaryInfoCard
            key={ss.label}
            iconContainerColor={ss.iconContainerColor}
            Icon={ss.Icon}
            value={ss.value}
            label={ss.label}
            iconColor={ss.iconColor}
          />
        ))}
      </Stack>
    </Stack>
  );
}
