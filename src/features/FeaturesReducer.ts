import { createSlice } from "@reduxjs/toolkit";
import { FeaturesReducerState } from "../app/state";
import { FeaturesThunk } from "../functions";

const FeaturesReducer = createSlice({
  name: "FeaturesReducer",
  initialState: FeaturesReducerState,
  reducers: {
    setFeatures: (state, action) => {
      state.features = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FeaturesThunk.fulfilled, (state, action) => {
      state.features = action.payload.data;
    });
  },
});

export default FeaturesReducer.reducer;
export const { setFeatures } = FeaturesReducer.actions;
