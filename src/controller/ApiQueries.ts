import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ApiRoutes, { baseUrl } from "../routes/ApiRoutes";
import { ResponseModel } from "../model/ResponseModel";
import PagedResult from "../model/PagedResult";
import { UserProfileInfo } from "../model/ProfileModel";
import QuestionsModel from "../model/QuestionsModel";
import { IController } from ".";
import { CourseInfo, CourseModel } from "../model/CourseModel";
import { SubjectModel } from "../model/SubjectModel";
import EducationModel from "../model/EducationModel";

export const usersQueryApi = createApi({
  reducerPath: "usersReducer",
  baseQuery: fetchBaseQuery({ baseUrl }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getUsers: builder.query<
      ResponseModel<PagedResult<UserProfileInfo>>,
      IController
    >({
      query: ({ method, url, token, params, contentType }) => ({
        method: method || "get",
        url: url || "",
        params,
        headers: {
          authorization: `Bearer ${token}`,
          contentType,
        },
      }),
    }),
    getUserByUserId: builder.query<ResponseModel<UserProfileInfo>, string>({
      query: (userId: string) => `user/${userId}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByUserIdQuery } = usersQueryApi;

//questions query
export const questionsQueryApi = createApi({
  reducerPath: "questionsReducer",
  baseQuery: fetchBaseQuery({ baseUrl, headers: {} }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getQuestions: builder.query<
      ResponseModel<PagedResult<QuestionsModel>>,
      IController
    >({
      query: ({
        method,
        url,
        token,
        params,
        data,
        contentType = "application/json",
      }) => ({
        method: method || "get",
        url: url || "",
        params,
        headers: {
          authorization: `Bearer ${token}`,
          contentType,
        },
      }),
    }),
  }),
});

export const { useGetQuestionsQuery } = questionsQueryApi;

//courses query
export const coursesQueryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  reducerPath: "coursesReducer",
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getCourses: builder.query<
      ResponseModel<PagedResult<CourseInfo>>,
      IController
    >({
      query: ({
        method,
        url,
        token,
        params,
        data,
        contentType = "application/json",
      }) => ({
        method: method || "get",
        url: url || "",
        params,
        data,
        header: {
          contentType,
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetCoursesQuery } = coursesQueryApi;

//subjects queries

export const subjectsReducer = createApi({
  reducerPath: "subjects",
  baseQuery: fetchBaseQuery({ baseUrl }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    subjects: builder.query<ResponseModel<SubjectModel[]>, IController>({
      query: ({ method, url, token, data, params, contentType }) => ({
        method: method || "get",
        url: url || "subject",
        data,
        token,
        contentType,
        params,
      }),
    }),
  }),
});

export const { useSubjectsQuery } = subjectsReducer;

//educational levels
//education queries
export const educationalLevelReducer = createApi({
  reducerPath: "educational-level",
  baseQuery: fetchBaseQuery({ baseUrl }),
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    education: builder.query<ResponseModel<EducationModel[]>, IController>({
      query: ({
        method,
        url,
        token,
        params,
        data,
        contentType = "application/json",
      }) => ({
        method: method || "get",
        url: url || "education",
        params,
        data,
        headers: {
          contentType,
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useEducationQuery } = educationalLevelReducer;
