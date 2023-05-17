import React from "react";
import { Stack, StackProps, SvgIconTypeMap, Typography } from "@mui/material";
import { GrLineChart } from "react-icons/gr";
import { primaryShades } from "../constants/AppColors";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IconType } from "react-icons";

interface IProps {
  label: string;
  value: any;
  iconContainerProps?: StackProps;
  props?: StackProps;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | IconType;
  iconContainerColor: any;
  iconColor: any;
}
export default function SummaryInfoCard({
  label,
  value,
  iconContainerProps,
  props,
  iconContainerColor,
  iconColor,
  Icon,
}: IProps) {
  return (
    <Stack direction="row" {...props}>
      <Stack
        bgcolor={iconContainerColor}
        color={iconContainerColor}
        width="40px"
        height="40px"
        borderRadius="100%"
        alignItems="center"
        justifyContent="center"
        {...iconContainerProps}
      >
        <Icon color={iconColor} />
      </Stack>
      <Stack paddingLeft={0.5}>
        <Typography variant="body1" fontWeight="bold">
          {value}
        </Typography>
        <Typography sx={(theme) => ({ marginTop: "-5px" })} variant="caption">
          {label}
        </Typography>
      </Stack>
    </Stack>
  );
}
