import { Stack, Typography } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import resources from "../../../resources";
import NavigationRoutes from "../../../routes/NavigationRoutes";

export default function AuthPage() {
  const { user } = useAppSelector((state) => state.UserReducer);
  const navigation = useNavigate();
  React.useEffect(() => {
    if (user && user.authenticated && user.token) {
      navigation(NavigationRoutes.home.root);
    }
    if (user && user.token && !user.authenticated) {
      navigation(NavigationRoutes.auth.changePassword);
    }
  }, [user]);
  return (
    <Stack
      height="100vh"
      width="100%"
      sx={(theme) => ({
        backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.65),rgba(0,0,0,0.76),rgba(0,0,0,0.85)),url(${resources.banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      })}
      alignItems="center"
      justifyContent="center"
    >
      <Outlet />
    </Stack>
  );
}
