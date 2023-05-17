import { Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import AppColors from "../constants/AppColors";

interface IProps {
  feature: string;
  children?: ReactNode;
}
export default function PricingFeatureCard({ feature, children }: IProps) {
  return (
    <Stack
      spacing={0.5}
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="flex-start"
    >
      <AiOutlineCheckCircle style={{ color: AppColors.primary }} />
      <Typography variant="body2" fontSize={(theme) => theme.spacing(1.85)}>
        {feature}
      </Typography>
      <Stack flex={1} />
      {children}
    </Stack>
  );
}
