import {
  colors,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { CiEdit, CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import AppColors from "../constants/AppColors";
import BillingRate from "../model/BillingRate";
import CustomIconButton from "./CustomIconButton";

interface IProps {
  info: BillingRate;
}
export default function BillingRateInfoCard({ info }: IProps) {
  return (
    <Grid item>
      <Stack
        bgcolor={(theme) => theme.palette.common.white}
        width="250px"
        border={(theme) => `1px solid ${theme.palette.action.hover}`}
        boxShadow={(theme) => theme.shadows[1]}
      >
        <Stack height="4px" bgcolor={(theme) => theme.palette.primary.main} />
        <Stack padding={0.45}>
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="flex-start"
            spacing={0.45}
          >
            <HiOutlineUserGroup color={colors.grey[400]} fontSize="small" />
            <small style={{ fontSize: "10px" }}>Group:</small>
            <Typography variant="caption">{info.category.title}</Typography>
            <Stack flex={1} />
            <IconButton size="small" color="default">
              <CiEdit fontSize="small" />
            </IconButton>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="flex-start"
            spacing={0.45}
          >
            <IoTimeOutline color={colors.blueGrey[400]} fontSize="small" />
            <small style={{ fontSize: "10px" }}>Period:</small>
            <Typography variant="caption">{info.title}</Typography>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="flex-start"
            spacing={0.45}
          >
            <CiMoneyCheck1 color={colors.blueGrey[400]} fontSize="small" />
            <small style={{ fontSize: "10px" }}>Price:</small>
            <Typography variant="caption">{info.price}</Typography>
            <Stack flex={1} />
            <small
              style={{
                backgroundColor: colors.grey[100],
                padding: "2px 8px",
                borderRadius: "30px",
                fontSize: "8px",
                fontFamily: "tahoma",
                color: AppColors.primary,
              }}
            >
              {info.tag}
            </small>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}
