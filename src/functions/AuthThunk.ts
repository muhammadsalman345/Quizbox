import controller, { IController } from "./../controller/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AccountModel from "../model/AccountModel";
import { ResponseModel } from "../model/ResponseModel";

export default createAsyncThunk(
  "api/auth/thunk",
  async ({ data, method, token, url, params }: IController) => {
    try {
      return await controller<ResponseModel<AccountModel>>({
        data,
        method,
        url,
        params,
        token,
      });
    } catch (error) {
      throw error;
    }
  }
);
