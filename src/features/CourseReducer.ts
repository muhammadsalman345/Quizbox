import { CourseModel } from "./../model/CourseModel";
import { createSlice } from "@reduxjs/toolkit";
import { CourseReducerState } from "../app/state";
import CourseThunk from "../functions/CourseThunk";
import PagedResult from "../model/PagedResult";

const courseReducer = createSlice({
  name: "CourseReducer",
  initialState: CourseReducerState,
  reducers: {
    setCourses: (state, action: { payload: PagedResult<CourseModel> }) => {
      state.courses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CourseThunk.fulfilled, (state, action) => {
      state.courses = action.payload.data;
    });
  },
});

export default courseReducer.reducer;
export const { setCourses } = courseReducer.actions;
