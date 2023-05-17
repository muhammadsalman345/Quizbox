import { Stack } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React from "react";
import { SidebarLinks } from "../data";
import SidebarLink from "./SidebarLink";

interface IProps {
  sidebar: boolean;
  handleSidebar: () => void;
}
export default function Sidebar({ sidebar, handleSidebar }: IProps) {
  return (
    <Drawer open={sidebar} variant="persistent">
      <Stack
        bgcolor={(theme) => theme.palette.background.paper}
        width="240px"
        height="100vh"
        padding={2}
      >
        {SidebarLinks.map((link) => (
          <SidebarLink key={link.title} info={link} />
        ))}
      </Stack>
    </Drawer>
  );
}
