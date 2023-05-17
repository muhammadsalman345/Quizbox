import { createSlice } from "@reduxjs/toolkit";
import { ResponseReducerState } from "../app/state";
import { AuthThunk, FeaturesThunk, QuestionsThunk } from "../functions";
import CourseThunk from "../functions/CourseThunk";

const ResponseReducer = createSlice({
  name: "ResponseReducer",
  initialState: ResponseReducerState,
  reducers: {
    clearResponse: (state) => {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    pendingResponse: (state) => {
      state.error = null;
      state.message = null;
      state.loading = true;
    },
    errorResponse: (state, action) => {
      state.error = action.payload;
      state.message = null;
      state.loading = false;
    },
    successResponse: (state, action) => {
      state.error = null;
      state.message = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(AuthThunk.fulfilled, (state, action) => {
        state.error = null;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(AuthThunk.rejected, (state, action) => {
        state.error =
          action.error.message || action.error.message || action.error;
        state.loading = false;
        state.message = null;
      })
      //
      .addCase(FeaturesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(FeaturesThunk.fulfilled, (state, action) => {
        state.error = null;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(FeaturesThunk.rejected, (state, action) => {
        state.error =
          action.error.message || action.error.message || action.error;
        state.loading = false;
        state.message = null;
      })
      //
      .addCase(CourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(CourseThunk.fulfilled, (state, action) => {
        state.error = null;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(CourseThunk.rejected, (state, action) => {
        state.error =
          action.error.message || action.error.message || action.error;
        state.loading = false;
        state.message = null;
      })
      //
      .addCase(QuestionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(QuestionsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(QuestionsThunk.rejected, (state, action) => {
        state.error =
          action.error.message || action.error.message || action.error;
        state.loading = false;
        state.message = null;
      });
  },
});

export const {
  clearResponse,
  pendingResponse,
  successResponse,
  errorResponse,
} = ResponseReducer.actions;
export default ResponseReducer.reducer;
