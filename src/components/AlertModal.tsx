import { Backdrop, colors, IconButton, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { BiMessageAltError } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearResponse } from "../features/ResponseReducer";

interface IProps {
  action?: ReactNode;
  text?: string;
  warning?: boolean;
  info?: boolean;
  isError?: boolean;
  isMessage?: boolean;
}
export default function AlertModal({
  action,
  text,
  warning,
  info,
  isError,
  isMessage,
}: IProps) {
  const { loading, error, message } = useAppSelector(
    (state) => state.ResponseReducer
  );
  const dispatch = useAppDispatch();
  return (
    <Backdrop
      sx={(theme) => ({
        zIndex: 999999,
      })}
      open={Boolean(error || message || text)}
    >
      <Stack
        minWidth="300px"
        minHeight="250px"
        bgcolor={(theme) => theme.palette.common.white}
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            width: "80%",
          },
        })}
        borderRadius={(theme) => theme.spacing(1)}
        padding={3}
      >
        {(error || isError) && (
          <VscError size={60} color={colors.red["A700"]} />
        )}
        {warning && <BiMessageAltError size={60} color={colors.orange[500]} />}
        {info && <BsInfoCircleFill size={60} color={colors.blue["A700"]} />}
        {(message || isMessage) && (
          <FiCheckCircle size={60} color={colors.green["A700"]} />
        )}
        <Typography
          color={
            error || isError
              ? "error"
              : message || isMessage
              ? "success"
              : warning
              ? "orange"
              : text
              ? "primary"
              : "default"
          }
          variant="body1"
          textAlign="center"
        >
          {message || error || text}
        </Typography>
        {action && action}
        {!action && (
          <IconButton
            size="small"
            sx={(theme) => ({
              borderRadius: theme.spacing(0.45),
              padding: theme.spacing(0, 2),
              height: "30px",
              border: `1px solid ${
                error || isError
                  ? "firebrick"
                  : message || isMessage
                  ? "seagreen"
                  : warning
                  ? "orange"
                  : text
                  ? colors.blue[600]
                  : "default"
              }`,
              color:
                error || isError
                  ? "firebrick"
                  : message || isMessage
                  ? "seagreen"
                  : warning
                  ? "orange"
                  : text
                  ? colors.blue[600]
                  : "default",
            })}
            onClick={() => dispatch(clearResponse())}
          >
            close
          </IconButton>
        )}
      </Stack>
    </Backdrop>
  );
}
