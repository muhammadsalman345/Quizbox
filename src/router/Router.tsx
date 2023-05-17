import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import HomeRouter from "./HomeRouter";
import LandingRouter from "./LandingRouter";

export default function Router() {
  return (
    <BrowserRouter>
      <HomeRouter />
      <AuthRouter />
      <LandingRouter />
    </BrowserRouter>
  );
}
