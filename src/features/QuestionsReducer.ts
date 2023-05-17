import { createSlice } from "@reduxjs/toolkit";
import { QuestionsReducerState } from "../app/state";
import { QuestionsThunk } from "../functions";

const QuestionsReducer = createSlice({
  name: "QuestionsReducer",
  initialState: QuestionsReducerState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(QuestionsThunk.fulfilled, (state, action) => {
      state.questions = action.payload.data;
    });
  },
});

export const { setQuestions } = QuestionsReducer.actions;
export default QuestionsReducer.reducer;
