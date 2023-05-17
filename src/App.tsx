import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import React, { useEffect } from "react";
import "./App.css";
import ThemeConfiguration from "./configuration/ThemeConfiguration";
import { Router } from "./router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { isExpired } from "react-jwt";
import { clearResponse, errorResponse } from "./features/ResponseReducer";
import { logout } from "./features/UserReducer";
import AlertModal from "./components/AlertModal";
//
export default function App() {
  const dispatch = useAppDispatch();
  const { error, loading, message } = useAppSelector(
    (state) => state.ResponseReducer
  );
  const { user } = useAppSelector((state) => state.UserReducer);

  ///

  const handleCloseNotifier = () => {
    dispatch(clearResponse());
  };

  ////

  useEffect(() => {
    const abortController = new AbortController();
    if (user && user.token && isExpired(user.token)) {
      dispatch(errorResponse("Session Expired, Please Login"));
      dispatch(logout());
    }

    return () => abortController.abort();
  }, []);

  function HandleNotifier() {
    Boolean(message) &&
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
        onClose: handleCloseNotifier,
        toastId: "success",
      });

    Boolean(error) &&
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "dark",
        onClose: handleCloseNotifier,
        toastId: "error",
      });

    return <Box></Box>;
  }
  return (
    <ThemeProvider theme={ThemeConfiguration}>
      <CssBaseline />
      <AlertModal />
      {/* {Boolean(error || message) && HandleNotifier()} */}
      {/* <ToastContainer draggable={true} autoClose={3000} /> */}
      <Router />
    </ThemeProvider>
  );
}
