import { TableCellProps } from "@mui/material/TableCell/TableCell";
import { ReactNode } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { IconType } from "react-icons";

export interface ISidebarLink {
  title: string;
  route?: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | IconType;
}

export interface ISummaryInfoCard {
  label: string;
  value: any;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | IconType;
  iconContainerColor: any;
  iconColor: any;
}

export interface ITableHeader {
  children: ReactNode | string;
  props?: TableCellProps;
}

export interface ModalBaseProps {
  handleClose: () => void;
  open: boolean;
}

export interface MenuBaseProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}
