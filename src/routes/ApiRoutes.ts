export default {
  auth: {
    login: "auth/account/login",
    resetPassword: (phoneNumber: string) => `auth/account/${phoneNumber}`,
    authenticate: "auth/account/authenticate",
    changePassword: "auth/account/password/change",
    crud: (path?: string) => (path ? `auth/${path}` : "auth"),
  },
  account: {
    crud: "account",
    updateStatus: (accountId: string) => `account/status/${accountId}`,
    updateRole: (accountId: string) => `account/role/${accountId}`,
    update: (accountId: string) => `account/${accountId}`,
  },
  course: {
    crud: "course",
    delete: (courseId: string) => `course/${courseId}`,
    filter: "course/filter",
  },
  category: {
    educationalLevel: "category/educational/level",
    questionsCategories: "category/questions/categories",
    addQuestionsCategories: "category/questions",
    addUsersCategories: "category/users/add",
    getUsersCategories: "category/users",
    challengeCategory: (id?: string) =>
      id ? `category/challenge/${id}` : "category/challenge",
    get: "category",
    updateQuestionCategory: (categoryId: string) =>
      `category/questions/${categoryId}`,
    deleteQuestionCategory: (categoryId: string) =>
      `category/questions/${categoryId}`,
    updateEducationalLevel: (levelId: string) =>
      `category/educational/level/${levelId}`,
    deleteEducationalLevel: (levelId: string) =>
      `category/educational/level/${levelId}`,
    deleteUsersCategory: (categoryId: string) =>
      `category/users/delete/${categoryId}`,
    updateUsersCategory: (categoryId: string) =>
      `category/users/update/${categoryId}`,
  },
  questions: {
    crud: (path?: string) => (path ? `questions/${path}` : "questions"),
  },
  subject: {
    crud: "subject",
    delete: (subjectId: string) => `subject/${subjectId}`,
    update: (subjectId: string) => `subject/${subjectId}`,
    addMany: "subject/many",
  },
  billingRate: {
    crud: "billing-rate",
    update_delete: (rateId: string) => `billing-rate/${rateId}`,
  },
  pricing: {
    crud: (pricingId?: string) =>
      pricingId ? `pricing/${pricingId}` : "pricing",
  },
  users: {
    crud: (path?: string) => (path ? `user/${path}` : "user"),
  },
};

// export const baseUrl: string = "http://192.168.115.144:3300";
// export const baseUrl: string = "http://localhost:3300";
export const baseUrl: string = "https://quizbox-rans.herokuapp.com";
