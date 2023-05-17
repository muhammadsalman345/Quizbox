import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface IProps {
  title: string;
  handleClose?: () => void;
}
export default function DialogHeader({ title, handleClose }: IProps) {
  return (
    <Stack
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="body1" color="primary" fontWeight="600">
        {title}
      </Typography>
      <IconButton onClick={handleClose} size="small">
        <IoMdClose />
      </IconButton>
    </Stack>
  );
}
