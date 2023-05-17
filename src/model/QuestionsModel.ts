import dayjs from "dayjs";
import FileModel from "./FileModel";

export default interface QuestionsModel extends CreateQuestionDto {
  _id: string;
  questionId: string;
  createdAt: string;
  updatedAt: string;
  academicLevel: string[];
  figure: FileModel | null;
}

export const QuestionInitialInfo: CreateQuestionDto = {
  questionId: "",
  statement: "",
  academicLevel: [],
  categoryId: "",
  answers: [],
  options: [],
};

export interface CreateQuestionDto {
  options: string[];
  answers: string[];
  statement: string;
  questionId: string;
  categoryId: string;
  academicLevel: string[];
}

export interface QuestionsUploadDto {
  questions: QuestionsModel[];
  educationalLevel: string;
  subject: string;
  year: string;
}

export interface UpdateQuestionInfoDto extends CreateQuestionDto {
  statement: string;
  options: string[];
  answers: string[];
  questionId: string;
  categoryId: string;
  subjectId: string;
  updatedAt: string;
  createdAt: string;
}
