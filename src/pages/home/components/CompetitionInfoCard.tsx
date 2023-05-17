import { colors, Divider, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { CiBookmarkCheck, CiCalendar } from "react-icons/ci";
import { GiTrophyCup } from "react-icons/gi";

interface IProps {
  index: number;
}
export default function CompetitionInfoCard({ index }: IProps) {
  return (
    <Grid item>
      <Stack
        bgcolor={(theme) => theme.palette.common.white}
        position="relative"
        boxShadow={(theme) => `1px 1px 1px 1px ${theme.palette.action.hover}`}
        width="200px"
        minHeight="100px"
        borderRadius={(theme) => theme.spacing(0.25)}
      >
        <Stack height="3px" bgcolor={(theme) => theme.palette.primary.main} />
        <Stack
          width="30px"
          height="30px"
          borderRadius="100%"
          border={(theme) => `1px solid ${theme.palette.action.hover}`}
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top={10}
          left={-15}
          zIndex={1}
          bgcolor={(theme) => theme.palette.common.white}
        >
          <GiTrophyCup />
        </Stack>
        <Stack spacing={0.5} paddingTop={1} paddingLeft="20px">
          <Typography
            variant="body1"
            lineHeight="12px"
            fontSize={(theme) => theme.spacing(1.45)}
          >
            Lorem ipsum dolor sit amet consectetur
          </Typography>
          <Divider />
          <Stack
            direction="row"
            spacing={0.5}
            width="100%"
            alignItems="center"
            justifyContent="flex-start"
            paddingRight={1}
          >
            <CiCalendar fontSize="small" />
            <Typography
              fontSize={(theme) => theme.spacing(1.35)}
              variant="caption"
            >
              {dayjs().format("DD/MM/YYYY")}
            </Typography>
            <Stack flex={1} />
            <CiBookmarkCheck
              color={index % 2 ? colors.green[500] : colors.red[500]}
              fontSize="small"
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            width="100%"
            spacing={0.5}
          >
            <Stack
              width="6px"
              height="6px"
              borderRadius="100%"
              bgcolor={(theme) => theme.palette.primary.main}
            />
            <Typography
              fontSize={(theme) => theme.spacing(1.25)}
              variant="caption"
            >
              contest tag
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}
