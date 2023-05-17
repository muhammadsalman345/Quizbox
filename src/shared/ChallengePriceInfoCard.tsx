import { colors, Divider, IconButton, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RowContainer } from "../components";
import { ChallengePrice } from "../model/ChallegeCategory";

interface IProps {
  info: ChallengePrice;
  handleDelete: () => void;
}
export default function ChallengePriceInfoCard({ info, handleDelete }: IProps) {
  return (
    <Stack
      border={(theme) => `1px solid ${theme.palette.action.disabledBackground}`}
      padding={0.85}
      borderRadius={(theme) => theme.spacing(0.5)}
    >
      <RowContainer>
        <>
          <Typography style={{ flex: 1, textAlign: "left" }} variant="body2">
            {info.title}
          </Typography>
          <RowContainer>
            <small
              style={{
                backgroundColor: colors.blue[700],
                borderRadius: "30px",
                textAlign: "center",
                padding: "2px 2.5px",
                minWidth: "30px",
                color: "#fff",
                fontSize: "10px",
              }}
            >
              {info.position}
            </small>
            <Typography variant="caption">Ghs {info.amount}</Typography>
          </RowContainer>
          <IconButton onClick={handleDelete} size="small">
            <IoCloseOutline fontSize="small" color="firebrick" />
          </IconButton>
        </>
      </RowContainer>
      <Divider />
      <Typography variant="caption">{info.description}</Typography>
    </Stack>
  );
}
