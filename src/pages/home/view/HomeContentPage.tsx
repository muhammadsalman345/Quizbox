import { Stack } from "@mui/material";
import React from "react";
import {
  MotivationCard,
  PendingRequestCard,
  RevenueReportCard,
  SchoolsTableCard,
  StatisticsSummaryCard,
  SubscriptionsSummaryCard,
  UserGroupSummaryChartCard,
} from "../components";

export default function HomeContentPage() {
  return (
    <Stack width="100%" height="100%">
      <Stack
        padding={4}
        spacing={2.5}
        width="100%"
        height="100%"
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Stack spacing={2} flex={1}>
          <StatisticsSummaryCard />
          <RevenueReportCard />
          <SchoolsTableCard />
        </Stack>
        <Stack
          height="100%"
          alignItems="center"
          justifyContent="flex-start"
          spacing={2}
          flex={0.25}
        >
          <MotivationCard />
          <SubscriptionsSummaryCard />
          <UserGroupSummaryChartCard />
          <PendingRequestCard />
        </Stack>
      </Stack>
    </Stack>
  );
}
