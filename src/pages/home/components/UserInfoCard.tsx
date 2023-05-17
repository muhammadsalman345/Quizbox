import React from "react";
import { UserProfileInfo } from "../../../model/ProfileModel";
import { Stack, Typography } from "@mui/material";
import { baseUrl } from "../../../routes/ApiRoutes";
import { MdAccountCircle } from "react-icons/md";
import { CustomIconButton } from "../../../components";

export interface IProps {
  user: UserProfileInfo;
}
export default React.memo(function UserInfoCard({ user }: IProps) {
  return (
    <Stack
      bgcolor={(theme) => theme.palette.common.white}
      padding={0.85}
      width="100%"
      boxShadow={(theme) => theme.shadows[1]}
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={1.5}
    >
      <Stack
        width="35px"
        height="35px"
        borderRadius="35px"
        alignItems="center"
        overflow="hidden"
        justifyContent="center"
        border={(theme) =>
          `1px solid ${theme.palette.action.disabledBackground}`
        }
      >
        {user.profile && user.profile.profileImage && (
          <img className="img" src={user.profile.profileImage.url} />
        )}
        {(!user.profile || (user.profile && !user.profile.profileImage)) && (
          <MdAccountCircle />
        )}
      </Stack>
      <Stack>
        <Typography variant="body1">{user.user.name}</Typography>
        <Typography variant="body2">{user.user.username}</Typography>
      </Stack>
      <Stack flex={1} />
      <CustomIconButton title="Readmore" variant="outlined" size="small" />
    </Stack>
  );
});
