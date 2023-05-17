import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "../pages/auth/view/AuthGuard";
import {
  CompetitionsPage,
  CoursesPage,
  FeaturesPage,
  HomeContentPage,
  HomePage,
  QuestionsPage,
  UsersPage,
} from "../pages/home/view";
import NavigationRoutes from "../routes/NavigationRoutes";
import { UploadQuestionsPage } from "../pages/questions/view";

export default function HomeRouter() {
  return (
    <Routes>
      <Route
        path={NavigationRoutes.home.root}
        element={
          <AuthGuard>
            <HomePage />
          </AuthGuard>
        }
      >
        <Route
          path=""
          element={
            <AuthGuard>
              <HomeContentPage />
            </AuthGuard>
          }
        />
        <Route
          path={NavigationRoutes.home.users}
          element={
            <AuthGuard>
              <UsersPage />
            </AuthGuard>
          }
        />
        <Route
          path={NavigationRoutes.home.questions}
          element={
            <AuthGuard>
              <QuestionsPage />
            </AuthGuard>
          }
        />
        <Route
          path={NavigationRoutes.home.courses}
          element={
            <AuthGuard>
              <CoursesPage />
            </AuthGuard>
          }
        />
        <Route
          path={NavigationRoutes.home.features}
          element={
            <AuthGuard>
              <FeaturesPage />
            </AuthGuard>
          }
        />
        <Route
          path={NavigationRoutes.home.competions}
          element={
            <AuthGuard>
              <CompetitionsPage />
            </AuthGuard>
          }
        />
        <Route
          path={NavigationRoutes.home.uploadQuestions}
          element={<UploadQuestionsPage />}
        />
      </Route>
    </Routes>
  );
}
