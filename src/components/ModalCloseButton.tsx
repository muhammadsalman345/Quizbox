import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface IProps {
  handleClick?: () => void;
  props?: IconButtonProps;
}
export default function ModalCloseButton({ handleClick, props }: IProps) {
  return (
    <IconButton onClick={handleClick} size="small" color="primary" {...props}>
      <IoMdClose />
    </IconButton>
  );
}
