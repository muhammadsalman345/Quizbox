import { Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

export default function MotivationCard() {
  return (
    <Stack
      padding={2}
      boxShadow={(theme) => `3px 3px 3px ${theme.palette.action.hover}`}
      minHeight="100px"
      bgcolor={(theme) => theme.palette.background.paper}
      borderRadius={(theme) => theme.spacing(1)}
      spacing={1.5}
    >
      <Typography variant="body1">Today's Motivation</Typography>
      <Typography variant="body2">
        "Believe in yourself and all that you are. Know that there is something
        inside you that is greater than any obstacle"
      </Typography>
      <Divider />
      <Typography
        variant="body2"
        textAlign="right"
        sx={(theme) => ({
          width: "100%",
        })}
      >
        Christian D. Larson
      </Typography>
    </Stack>
  );
}
