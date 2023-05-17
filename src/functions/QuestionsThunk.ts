import controller, { IController } from "./../controller/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../model/ResponseModel";
import QuestionsModel from "../model/QuestionsModel";
import PagedResult from "../model/PagedResult";

export default createAsyncThunk(
  "api/questions/thunk",
  async ({ data, token, url, params, method }: IController) => {
    try {
      return await controller<ResponseModel<PagedResult<QuestionsModel>>>({
        data,
        url,
        params,
        token,
        method,
      });
    } catch (error) {
      throw error;
    }
  }
);
