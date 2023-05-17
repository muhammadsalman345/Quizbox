import controller, { IController } from "./../controller/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseModel } from "../model/ResponseModel";
import { CourseModel } from "../model/CourseModel";
import PagedResult from "../model/PagedResult";

export default createAsyncThunk(
  "api/course",
  async ({ data, token, url, method, params }: IController) => {
    try {
      return await controller<ResponseModel<PagedResult<CourseModel>>>({
        data,
        token,
        url,
        method,
        params,
      });
    } catch (error) {
      throw error;
    }
  }
);
