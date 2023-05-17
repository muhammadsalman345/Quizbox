import { createSlice } from "@reduxjs/toolkit";
import { UserReducerState } from "../app/state";
import { AuthThunk } from "../functions";
import AccountModel from "../model/AccountModel";

const UserReducer = createSlice({
  name: "UserReducer",
  initialState: UserReducerState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action: { payload: AccountModel }) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AuthThunk.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
  },
});

export const { logout, setUser } = UserReducer.actions;
export default UserReducer.reducer;
