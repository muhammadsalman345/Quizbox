import { Button, ButtonProps } from "@mui/material";
import { textTransform } from "@mui/system";
import React from "react";
import { useAppSelector } from "../app/hooks";

interface IProps {
  title: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  props?: ButtonProps;
  marginTop?: number;
}
export default function PrimaryButton({
  title,
  handleClick,
  props,
  marginTop,
}: IProps) {
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  return (
    <Button
      variant="contained"
      size="small"
      fullWidth
      color="primary"
      disabled={loading}
      onClick={handleClick}
      sx={(theme) => ({
        height: "30px",
        textTransform: "none",
        marginTop: marginTop ? theme.spacing(marginTop) : 0,
      })}
      {...props}
    >
      {loading ? "loading..." : title}
    </Button>
  );
}
