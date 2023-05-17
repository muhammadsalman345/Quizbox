import { colors, Stack } from "@mui/material";
import React from "react";
import { CustomLink, InputGroup, PrimaryButton } from "../../../components";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { LoginDto } from "../../../dto/LoginDto";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AuthThunk } from "../../../functions";
import ApiRoutes from "../../../routes/ApiRoutes";
import NavigationRoutes from "../../../routes/NavigationRoutes";
import ResetPasswordDto from "../../../dto/ResetPasswordDto";

////
export default function ChangePassword() {
  const [info, setInfo] = React.useState<ResetPasswordDto>({
    authenticationCode: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserReducer);

  function handleChangePassword() {
    dispatch(
      AuthThunk({
        data: info,
        url: ApiRoutes.auth.changePassword,
        method: "put",
        token: user?.token,
      })
    );
  }
  return (
    <Stack alignItems="center" justifyContent="center">
      <Stack
        width="100px"
        height="40px"
        borderRadius={(theme) => theme.spacing(2, 3)}
        alignItems="center"
        justifyContent="center"
        marginTop="-20px"
        color="primary"
        bgcolor={colors.grey[100]}
      >
        <RiShieldKeyholeFill fontSize="large" />
      </Stack>
      <Stack
        width="350px"
        height="250px"
        padding={2}
        borderRadius={(theme) => theme.spacing(0.5, 2)}
        bgcolor={colors.grey[100]}
        boxShadow={(theme) => theme.shadows[1]}
      >
        <Stack spacing={1.5}>
          <InputGroup
            handleChange={(e) =>
              setInfo({ ...info, authenticationCode: e.target.value })
            }
            label="Authentication Code"
            placeholder="otp"
            props={{ type: "number", name: "otp" }}
          />
          <InputGroup
            handleChange={(e) => setInfo({ ...info, password: e.target.value })}
            label="Password"
            placeholder="password"
            props={{ type: "password", name: "password" }}
          />
          <PrimaryButton
            handleClick={handleChangePassword}
            title="Submit"
            marginTop={1.5}
          />
          <CustomLink
            route={NavigationRoutes.auth.resetPassword}
            text="Reset Password"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
