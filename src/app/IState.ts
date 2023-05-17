import { CourseModel } from "./../model/CourseModel";
import AccountModel from "../model/AccountModel";
import FeaturesModel from "../model/FeaturesModel";
import PagedResult from "../model/PagedResult";
import QuestionsModel from "../model/QuestionsModel";

export interface IResponseReducerState {
  loading: boolean;
  message: any;
  error: any;
}

export interface IUserReducerState {
  user: AccountModel | null;
}

export interface IAccountsReducerState {
  accounts: AccountModel[];
}

export interface IFeaturesReducerState {
  features: FeaturesModel;
}

export interface ICourseReducerState {
  courses: PagedResult<CourseModel>;
}

export interface IQuestionsReducerState {
  questions: PagedResult<QuestionsModel>;
}
