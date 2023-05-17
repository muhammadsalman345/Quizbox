import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DialogHeader } from "../../../shared";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { InputGroup, PrimaryButton } from "../../../components";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import ApiRoutes from "../../../routes/ApiRoutes";
import { AuthThunk } from "../../../functions";
import { IDialogBaseProps } from "../../../interface";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps extends IDialogBaseProps {}

export default function LoginDialog({ open, handleClose }: IProps) {
  const [info, setInfo] = React.useState<{
    phoneNumber: string;
    password: string;
  }>({ phoneNumber: "", password: "" });
  const [showPassword, setShowPassword] = React.useState<Boolean>(false);
  const dispatch = useAppDispatch();
  function handlePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <DialogHeader
          title="Session Expired, Sign In"
          handleClose={handleClose}
        />
      </DialogTitle>
      <DialogContent>
        <Stack padding={1} spacing={1.5} width="100%">
          <InputGroup
            handleChange={(e) =>
              setInfo({ ...info, phoneNumber: e.target.value })
            }
            label="PhoneNumber"
            placeholder="mobile number"
            props={{ type: "tel" }}
          />
          <InputGroup
            label="Password"
            props={{
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordVisibility}>
                      {showPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOffOutlined fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                type: showPassword ? "text" : "password",
                name: "password",
              },
            }}
            placeholder="Password"
            handleChange={(e) => setInfo({ ...info, password: e.target.value })}
          />
          <PrimaryButton
            handleClick={() =>
              dispatch(
                AuthThunk({
                  url: ApiRoutes.auth.login,
                  method: "post",
                  data: info,
                })
              )
            }
            title="Sign In"
            props={{ disabled: !info.password || !info.phoneNumber }}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
