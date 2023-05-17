import React, { ReactNode } from "react";
import Drawer from "@mui/material/Drawer";

interface IProps {
  open: boolean;
  handleClose: () => void;
  children?: ReactNode;
}

export default function FilterDrawer({ open, handleClose, children }: IProps) {
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      {children}
    </Drawer>
  );
}
