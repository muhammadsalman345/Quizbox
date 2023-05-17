import { Stack, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { useAppSelector } from "../../../app/hooks";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { LoginDialog } from "../components";
interface IProps {
  children: ReactNode;
}
export default function AuthGuard({ children }: IProps) {
  const navigation = useNavigate();
  const { start, pause, time } = useTimer({
    step: 1,
    initialTime: 0,
    interval: 1000,
    timerType: "INCREMENTAL",
    onTimeUpdate: handleTimerUpdate,
  });
  const { user } = useAppSelector((state) => state.UserReducer);
  const [login, setLogin] = useState(false);
  function handleTimerUpdate() {
    if (user && user?.token && isExpired(user?.token)) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    if (user && !user.token) {
      setLogin(true);
    }
    if (!user) {
      setLogin(true);
    }
  }

  useEffect(() => {
    start();
  }, []);
  return (
    <Stack>
      <LoginDialog
        open={login}
        handleClose={() => {
          setLogin(false);
          navigation("/");
        }}
      />
      {children}
    </Stack>
  );
}
