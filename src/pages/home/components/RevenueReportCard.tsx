import { colors, MenuItem, Stack } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import React from "react";
import { CustomBarChart, CustomLineChart } from "../../../charts";
import { InputGroup } from "../../../components";
import {
  BrushBarGraph,
  LineChartGraph,
  RevenuReportChart,
} from "../../../shared";

export default function RevenueReportCard() {
  return (
    <Stack
      component="div"
      padding={2}
      spacing={0.5}
      boxShadow={(theme) => `3px 3px 3px ${theme.palette.action.hover}`}
      bgcolor={(theme) => theme.palette.background.paper}
      borderRadius={(theme) => theme.spacing(0.85)}
      minHeight="200px"
    >
      <Stack direction="row">
        <Stack flex={1}>
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">Revenue Report</Typography>
          </Stack>
          <Stack height="100%" padding={2}>
            <CustomBarChart />
            {/* <BrushBarGraph /> */}
          </Stack>
        </Stack>
        <Stack
          width="1px"
          borderRight={(theme) =>
            `1px solid ${theme.palette.action.disabledBackground}`
          }
          height="100%"
          alignItems="center"
          justifyContent="center"
        />
        <Stack
          alignItems="center"
          justifyContent="center"
          height="100%"
          flex={0.5}
          display="flex"
        >
          <Stack
            direction="row"
            alignItems="center"
            width="100%"
            justifyContent="flex-end"
          >
            <Stack
              width="10px"
              height="10px"
              borderRadius="100%"
              bgcolor={(theme) => theme.palette.primary.main}
            />
            <Typography variant="caption" color={colors.grey[400]}>
              Earning
            </Typography>
          </Stack>
          <Stack alignItems="center" width="100%" justifyContent="center">
            <InputGroup
              props={{
                select: true,
                fullWidth: false,
                sx: (theme) => ({
                  width: "100px",
                  alignSelf: "center",
                }),
                value: "2020",
              }}
            >
              <MenuItem value="2020">2020</MenuItem>
            </InputGroup>
            <Stack alignItems="center" justifyContent="center" padding={1}>
              <Typography variant="h6" fontWeight="bold">
                $25,852
              </Typography>
              <Typography color={colors.grey[400]} variant="body1">
                Budget: 56,800
              </Typography>
            </Stack>
            <Stack minHeight="250px">
              {/* <CustomLineChart /> */}
              <LineChartGraph />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
