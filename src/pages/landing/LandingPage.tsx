import { CircularProgress, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import resources from "../../resources";
import NavigationRoutes from "../../routes/NavigationRoutes";

export default function LandingPage() {
  const navigation = useNavigate();
  const { user } = useAppSelector((state) => state.UserReducer);
  const timeout = setTimeout(() => {
    if (user && user.authenticated && user.token) {
      navigation(NavigationRoutes.home.root);
    } else {
      navigation(NavigationRoutes.auth.login);
    }
  }, 2500);

  useEffect(() => {
    return () => {};
  }, []);
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
      <Typography
        color={(theme) => theme.palette.common.white}
        variant="h2"
        fontWeight="bold"
      >
        QuizBox- BackOffice{" "}
      </Typography>
      <Typography color={(theme) => theme.palette.common.white} variant="body1">
        Welcome &copy; {dayjs().format("YYYY")}
      </Typography>
      <Stack width="60px" padding={2} height="60px">
        <CircularProgress
          color="primary"
          variant="indeterminate"
          size="small"
        />
      </Stack>
    </Stack>
  );
}
