import { configureStore, ThunkAction, Action, compose } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import reducer from "./reducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import {
  coursesQueryApi,
  educationalLevelReducer,
  questionsQueryApi,
  subjectsReducer,
  usersQueryApi,
} from "../controller/ApiQueries";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createLogger } from "redux-logger";

const logger = createLogger();
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["UserReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger)
      .concat(thunk)
      .concat(usersQueryApi.middleware)
      .concat(coursesQueryApi.middleware)
      .concat(subjectsReducer.middleware)
      .concat(educationalLevelReducer.middleware)
      .concat(questionsQueryApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
setupListeners(store.dispatch);
