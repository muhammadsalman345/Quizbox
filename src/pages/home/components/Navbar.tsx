import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useAppSelector } from "../../../app/hooks";
import { CustomAvatar } from "../../../components";

interface IProps {
  sidebar: boolean;
  handleSidebar: () => void;
}
export default function Navbar({ sidebar, handleSidebar }: IProps) {
  const { user } = useAppSelector((state) => state.UserReducer);
  return (
    <AppBar
      sx={(theme) => ({
        paddingLeft: sidebar ? "240px" : "0px",
        bgcolor: theme.palette.common.white,
      })}
      variant="outlined"
    >
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
        >
          <Typography
            variant="body2"
            color={(theme) => theme.palette.common.black}
          >
            {user?.name}
          </Typography>
          <IconButton
            sx={(theme) => ({
              borderRadius: theme.spacing(0.5),
              bgcolor: theme.palette.common.white,
              boxShadow: `1px solid ${theme.palette.action.hover}`,
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${theme.palette.action.hover}`,
            })}
          >
            <IoNotificationsOutline fontSize="small" />
          </IconButton>
          <CustomAvatar />
          <IconButton
            onClick={handleSidebar}
            color="primary"
            size="small"
          ></IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
