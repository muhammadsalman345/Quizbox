import { Stack } from "@mui/material";
import React from "react";
import { FiSearch } from "react-icons/fi";

interface IProps {
  placeholder?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchInput({ placeholder, handleChange }: IProps) {
  return (
    <Stack
      direction="row"
      padding={(theme) => theme.spacing(0.5, 0.85)}
      border={(theme) => `1px solid ${theme.palette.action.disabledBackground}`}
      alignItems="center"
      justifyContent="flex-start"
      borderRadius={(theme) => theme.spacing(0.85)}
    >
      <FiSearch fontSize="small" />
      <input
        placeholder={placeholder ? placeholder : "search..."}
        style={{ outline: "none", borderStyle: "none", flex: 1 }}
      />
    </Stack>
  );
}
