import { colors } from "@mui/material";
import React, { ChangeEvent } from "react";

interface IProps {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  style?: object;
  type?: "email" | "number" | "tel" | "password";
  value?: any;
}
export default function SmallInput({
  handleChange,
  placeholder,
  label,
  type,
  style,
  value,
}: IProps) {
  return (
    <div
      style={{
        borderRadius: "5px",
        border: `1px solid ${colors.grey[300]}`,
        padding: "5px",
        position: "relative",
        ...style,
      }}
    >
      {label && (
        <small
          style={{
            position: "absolute",
            top: "-8px",
            zIndex: 1,
            fontSize: "11px",
            backgroundColor: "#fff",
            left: 15,
          }}
        >
          {label}
        </small>
      )}
      <input
        style={{
          outline: "none",
          width: "100%",
          color: "#000",
          fontSize: "13px",
          paddingLeft: "8px",
          borderStyle: "none",
        }}
        onChange={handleChange}
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
