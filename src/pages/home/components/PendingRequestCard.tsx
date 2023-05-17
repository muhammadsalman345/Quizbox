import { colors, Divider, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { primaryShades } from "../../../constants/AppColors";
import { PendingRequestInfoCard } from "../../../shared";

export default function PendingRequestCard() {
  return (
    <Stack
      bgcolor={(theme) => theme.palette.common.white}
      boxShadow={(theme) => `3px 3px 3px ${theme.palette.action.hover}`}
      minHeight="150px"
      width="100%"
      borderRadius={(theme) => theme.spacing(1)}
      padding={2}
    >
      <Stack></Stack>
      <Stack width="100%" padding={0.5}>
        <Typography variant="body1" textAlign="left">
          Pending Request
        </Typography>
        <Divider />
        {Array.from({ length: 3 }).map((_, i) => (
          <PendingRequestInfoCard key={i.toString()} />
        ))}
        <Stack padding={1.5} alignItems="center" justifyContent="center">
          <IconButton
            sx={(theme) => ({
              borderRadius: theme.spacing(0.45),
              padding: theme.spacing(0.5, 1.5),
              bgcolor: primaryShades[100],
              "&:hover": {
                bgcolor: primaryShades[100],
              },
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            <Typography color={"primary"} variant="caption">
              View All
            </Typography>
            <FiChevronRight fontSize="small" color={primaryShades[500]} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
