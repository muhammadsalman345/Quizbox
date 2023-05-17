import { Link, LinkProps } from "@mui/material";
import React from "react";

interface IProps {
  text: string;
  route?: string;
  props?: LinkProps;
}
export default function CustomLink({ text, route, props }: IProps) {
  return (
    <Link
      sx={(theme) => ({
        width: "100%",
        textDecoration: "none",
        textAlign: "center",
      })}
      href={route}
    >
      {text}
    </Link>
  );
}
