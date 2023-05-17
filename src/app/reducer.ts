import { combineReducers } from "@reduxjs/toolkit";

import {
  UserReducer,
  ResponseReducer,
  FeaturesReducer,
  CourseReducer,
  QuestionsReducer,
} from "../features";
import {
  coursesQueryApi,
  educationalLevelReducer,
  questionsQueryApi,
  subjectsReducer,
  usersQueryApi,
} from "../controller/ApiQueries";

///
export default combineReducers({
  UserReducer,
  ResponseReducer,
  FeaturesReducer,
  CourseReducer,
  QuestionsReducer,
  [usersQueryApi.reducerPath]: usersQueryApi.reducer,
  [questionsQueryApi.reducerPath]: questionsQueryApi.reducer,
  [coursesQueryApi.reducerPath]: coursesQueryApi.reducer,
  [subjectsReducer.reducerPath]: subjectsReducer.reducer,
  [educationalLevelReducer.reducerPath]: educationalLevelReducer.reducer,
});
