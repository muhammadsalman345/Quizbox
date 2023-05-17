import { Row } from "read-excel-file";
import { ChallengePrice } from "../../../model/ChallegeCategory";
import QuestionsModel, {
  CreateQuestionDto,
  QuestionInitialInfo,
} from "../../../model/QuestionsModel";
import { generateId } from "../../../utils";

export function prepareQuestionData(row: Row): QuestionsModel {
  console.log(row);
  let question: QuestionsModel = {
    ...QuestionInitialInfo,
    statement: "",
    questionId: generateId(),
    figure: null,
    _id: "",
    createdAt: "",
    updatedAt: "",
  };
  let questionAnswers: string[] = [];
  let plausibleAnswers: string[] = [];
  question.statement = row[0] ? row[0].toString() : "";
  for (let i = 1; i < 5; i++) {
    row[i] && plausibleAnswers.push(row[i].toString());
  }
  for (let i = 5; i < row.length; i++) {
    row[i] && questionAnswers.push(row[i].toString());
  }

  question.answers = questionAnswers;
  question.options = plausibleAnswers;
  questionAnswers = [];
  plausibleAnswers = [];

  return question;
}

////////
export function ValidateChallengePrice(info: ChallengePrice) {
  if (info.title.length <= 0) {
    throw "Challenge Price Title Is Required";
  }
  if (info.position <= 0) {
    throw "Challenge Price Position Required";
  }
}

export function validateQuestionInfo(info: CreateQuestionDto) {
  if (!info.categoryId.trim()) {
    throw "Please select question category";
  }
  if (info.academicLevel.length <= 0) {
    throw "please seleelect academic level";
  }
  if (info.answers.length <= 0) {
    throw "please enter question answer(s)";
  }
  if (info.options.length <= 0) {
    throw "please enter plausible answers";
  }
}
