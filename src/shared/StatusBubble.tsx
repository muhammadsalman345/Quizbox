import { Stack, colors } from "@mui/material";
import React from "react";

interface IProps {
  variant: "pending" | "approved" | "deleted" | "completed" | "default";
}
export default function StatusBubble({ variant }: IProps) {
  if (variant === "approved") {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        borderRadius="10px"
        border={(theme) => `1px solid ${theme.palette.action.hover}`}
        bgcolor={(theme) => theme.palette.primary.main}
        color={(theme) => theme.palette.common.white}
        fontSize={(theme) => theme.spacing(1.15)}
        padding={(theme) => theme.spacing(0, 1)}
      >
        approved
      </Stack>
    );
  }
  if (variant === "pending") {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        borderRadius="10px"
        border={(theme) => `1px solid ${colors.orange[500]}`}
        bgcolor={(theme) => colors.orange[500]}
        color={(theme) => theme.palette.common.white}
        fontSize={(theme) => theme.spacing(1.15)}
        padding={(theme) => theme.spacing(0, 1)}
      >
        pending
      </Stack>
    );
  }
  if (variant === "deleted") {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        borderRadius="10px"
        border={(theme) => `1px solid ${theme.palette.error.main}`}
        bgcolor={(theme) => theme.palette.error.main}
        color={(theme) => theme.palette.common.white}
        fontSize={(theme) => theme.spacing(1.15)}
        padding={(theme) => theme.spacing(0, 1)}
      >
        deleted
      </Stack>
    );
  }
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      borderRadius="10px"
      border={(theme) => `1px solid ${theme.palette.action.disabledBackground}`}
      bgcolor={(theme) => theme.palette.action.disabled}
      color={(theme) => theme.palette.common.black}
      fontSize={(theme) => theme.spacing(1.15)}
      padding={(theme) => theme.spacing(0, 1)}
    >
      {}
    </Stack>
  );
}
