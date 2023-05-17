import { Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  label?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: TextFieldProps;
  placeholder?: string;
  children?: ReactNode;
}
export default function InputGroup({
  label,
  placeholder,
  handleChange,
  props,
  children,
}: IProps) {
  return (
    <Stack spacing={0.5} width="100%">
      {label && <Typography variant="caption">{label}</Typography>}
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        placeholder={placeholder}
        className={props && props.multiline ? "" : "small-input"}
        onChange={handleChange}
        sx={(theme) => ({
          fontSize: theme.spacing(1.5),
        })}
        {...props}
      >
        {children}
      </TextField>
    </Stack>
  );
}
