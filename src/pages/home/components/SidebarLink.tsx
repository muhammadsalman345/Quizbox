import { colors, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { ISidebarLink } from "../interface";

interface IProps {
  info: ISidebarLink;
}
export default function SidebarLink({ info }: IProps) {
  const location = useLocation();
  const navigation = useNavigate();
  return (
    <IconButton
      sx={(theme) => ({
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(0.85, 2),
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        bgcolor:
          location.pathname === info.route
            ? theme.palette.primary.main
            : theme.palette.action.hover,
        marginY: theme.spacing(0.25),
        color:
          location.pathname === info.route
            ? theme.palette.common.white
            : colors.grey[900],
        boxShadow: "none",
        "&:hover": {
          bgcolor:
            location.pathname === info.route
              ? theme.palette.primary.dark
              : theme.palette.action.hover,
          marginY: theme.spacing(0.25),
          color:
            location.pathname === info.route
              ? theme.palette.common.white
              : colors.grey[900],
          boxShadow: "none",
        },
      })}
      onClick={() => navigation(info.route ? info.route : "")}
      size="medium"
    >
      <info.Icon fontSize="small" />
      <Typography
        sx={(theme) => ({
          marginLeft: theme.spacing(1),
        })}
        variant="body2"
      >
        {info.title}
      </Typography>
    </IconButton>
  );
}
