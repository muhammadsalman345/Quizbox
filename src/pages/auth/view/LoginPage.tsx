import { colors, Stack } from "@mui/material";
import React from "react";
import { CustomLink, InputGroup, PrimaryButton } from "../../../components";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { LoginDto } from "../../../dto/LoginDto";
import { useAppDispatch } from "../../../app/hooks";
import { AuthThunk } from "../../../functions";
import ApiRoutes from "../../../routes/ApiRoutes";
import NavigationRoutes from "../../../routes/NavigationRoutes";
export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [info, setInfo] = React.useState<LoginDto>({
    phoneNumber: "",
    password: "",
  });

  function handleLogin() {
    dispatch(
      AuthThunk({ data: info, url: ApiRoutes.auth.login, method: "post" })
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
              setInfo({ ...info, phoneNumber: e.target.value })
            }
            label="Username"
            placeholder="phone/email"
          />
          <InputGroup
            handleChange={(e) => setInfo({ ...info, password: e.target.value })}
            label="Password"
            placeholder="password"
            props={{ type: "password" }}
          />
          <PrimaryButton
            handleClick={handleLogin}
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
