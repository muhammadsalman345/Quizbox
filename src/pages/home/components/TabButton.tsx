import { IconButton, Typography } from "@mui/material";
import React from "react";
interface IProps {
  title: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  current?: string;
}
export default function TabButton({ title, handleClick, current }: IProps) {
  return (
    <IconButton
      size="small"
      sx={(theme) => ({
        padding: theme.spacing(0.85, 1),
        borderRadius: theme.spacing(0.5),
      })}
      onClick={handleClick}
    >
      <Typography color={title === current ? "primary" : ""} variant="caption">
        {title}
      </Typography>
    </IconButton>
  );
}
