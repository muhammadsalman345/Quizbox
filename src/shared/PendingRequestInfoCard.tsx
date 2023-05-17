import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { primaryShades } from "../constants/AppColors";
export default function PendingRequestInfoCard() {
  return (
    <Stack
      spacing={0.5}
      direction="row"
      width="100%"
      justifyContent="flex-start"
      padding={0.5}
      alignItems="center"
    >
      <Stack
        width="25px"
        height="25px"
        borderRadius={(theme) => theme.spacing(0.45)}
        alignItems="center"
        justifyContent="center"
        bgcolor={primaryShades[100]}
      >
        <CiLocationOn color={primaryShades[900]} />
      </Stack>
      <Stack>
        <Typography fontSize={(theme) => theme.spacing(1.5)} variant="body2">
          Bryant Mission School
        </Typography>
        <Typography fontSize={(theme) => theme.spacing(1.35)} variant="caption">
          {dayjs().format("MMMM DD, hh:mm a")}
        </Typography>
      </Stack>
    </Stack>
  );
}
