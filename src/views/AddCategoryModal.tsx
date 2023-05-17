import React, { ChangeEvent, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { IconButton, Stack, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { InputGroup, PrimaryButton } from "../components";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  handleClose: () => void;
  open: boolean;
  handleTitle?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDescription?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: MouseEvent<HTMLButtonElement>) => void;
  placeholder?: string;
  title?: string;
}

export default function AddCategoryModal({
  handleTitle,
  handleDescription,
  handleSubmit,
  open,
  handleClose,
  title,
  placeholder,
}: IProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Stack
          direction="row"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1">{"Add Category"}</Typography>
          <IconButton onClick={handleClose} size="small" color="primary">
            <IoMdClose />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1.5} width="100%">
          <InputGroup
            handleChange={handleTitle}
            label={title}
            placeholder={placeholder}
          />
          <InputGroup
            handleChange={handleDescription}
            label="Description"
            props={{ multiline: true }}
            placeholder="category description"
          />
          <PrimaryButton handleClick={handleSubmit} title="Submit" />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
