import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages/landing";
import NavigationRoutes from "../routes/NavigationRoutes";

export default function LandingRouter() {
  return (
    <Routes>
      <Route path={NavigationRoutes.landing.root} element={<LandingPage />} />
    </Routes>
  );
}
