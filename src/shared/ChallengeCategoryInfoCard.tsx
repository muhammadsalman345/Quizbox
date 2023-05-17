import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { CustomIconButton, RowContainer } from "../components";
import ChallengeCategory from "../model/ChallegeCategory";

interface IProps {
  info: ChallengeCategory;
}
export default function ChallengeCategoryInfoCard({ info }: IProps) {
  return (
    <Stack
      sx={(theme) => ({
        borderRadius: theme.spacing(0.85),
        border: `1px solid ${theme.palette.action.disabledBackground}`,
      })}
      width="100%"
      padding={1}
      spacing={1}
    >
      <Typography variant="body1">{info.title}</Typography>
      <Divider />
      <RowContainer>
        <>
          <RowContainer>
            <>
              <Typography variant="caption">Number Of Participants</Typography>
              <Typography variant="body1" fontWeight="bold" color="primary">
                {info.numberOfParticipants}
              </Typography>
            </>
          </RowContainer>
          <div style={{ flex: 1 }} />
          <CustomIconButton
            size="small"
            variant="outlined"
            title="Read More"
            Icon={MdOutlineMoreVert}
          />
        </>
      </RowContainer>
    </Stack>
  );
}
