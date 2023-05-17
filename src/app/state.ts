import {
  IUserReducerState,
  IResponseReducerState,
  IAccountsReducerState,
  IFeaturesReducerState,
  ICourseReducerState,
  IQuestionsReducerState,
} from "./IState";

export const ResponseReducerState: IResponseReducerState = {
  message: null,
  error: null,
  loading: false,
};

export const UserReducerState: IUserReducerState = {
  user: null,
};

export const AccountsReducerState: IAccountsReducerState = {
  accounts: [],
};

export const FeaturesReducerState: IFeaturesReducerState = {
  features: {
    questionsCategories: [],
    educationLevels: [],
    usersCategory: [],
    billingRates: [],
    pricing: [],
    challengeCategories: [],
  },
};

export const CourseReducerState: ICourseReducerState = {
  courses: {
    results: [],
    page: 0,
    pageSize: 0,
    totalDocuments: 0,
    totalPages: 0,
  },
};

export const QuestionsReducerState: IQuestionsReducerState = {
  questions: {
    page: 1,
    results: [],
    pageSize: 0,
    totalDocuments: 0,
    totalPages: 0,
  },
};
