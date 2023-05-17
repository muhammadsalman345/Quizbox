import controller, { IController } from "./../controller/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../model/ResponseModel";
import FeaturesModel from "../model/FeaturesModel";

export default createAsyncThunk(
  "api/features/thunk",
  async ({ data, token, method, url, params }: IController) => {
    try {
      return await controller<ResponseModel<FeaturesModel>>({
        data,
        method,
        url,
        token,
        params,
      });
    } catch (error) {
      throw error;
    }
  }
);
