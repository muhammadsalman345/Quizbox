import { colors, Stack } from "@mui/material";
import React, { useState } from "react";
import { InputGroup, PrimaryButton } from "../../../components";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { AuthThunk } from "../../../functions";
import ApiRoutes from "../../../routes/ApiRoutes";
export default function ResetPasswordPage() {
  const navigation = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const dispatch = useAppDispatch();

  function handleResetPassword() {
    dispatch(
      AuthThunk({
        url: ApiRoutes.auth.resetPassword(phoneNumber),
        method: "put",
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
        height="150px"
        padding={2}
        borderRadius={(theme) => theme.spacing(0.5, 2)}
        bgcolor={colors.grey[100]}
        boxShadow={(theme) => theme.shadows[1]}
      >
        <Stack spacing={1.5}>
          <InputGroup
            handleChange={(e) => setPhoneNumber(e.target.value)}
            label="PhoneNumber"
            placeholder="enter phone number"
          />
          <PrimaryButton
            handleClick={handleResetPassword}
            title="Submit"
            marginTop={1.5}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
