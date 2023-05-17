import { Stack } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import NavigationRoutes from "../../../routes/NavigationRoutes";
import { Navbar, Sidebar } from "../components";

export default function HomePage() {
  const [sidebar, setSidebar] = useState<boolean>(true);
  const { user } = useAppSelector((state) => state.UserReducer);
  const navigation = useNavigate();
  React.useEffect(() => {
    if (!user) {
      navigation(NavigationRoutes.auth.login);
    }
    if (user && !user.authenticated) {
      navigation(NavigationRoutes.auth.changePassword);
    }
  }, [user]);
  return (
    <Stack width="100%" bgcolor={(theme) => theme.palette.action.hover}>
      <Navbar sidebar={sidebar} handleSidebar={() => setSidebar(!sidebar)} />
      <Sidebar sidebar={sidebar} handleSidebar={() => setSidebar(!sidebar)} />
      <Stack marginTop="60px" paddingLeft={sidebar ? "240px" : "0px"}>
        <Outlet />
      </Stack>
    </Stack>
  );
}
