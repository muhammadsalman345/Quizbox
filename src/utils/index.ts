import dayjs from "dayjs";
import { v4 } from "uuid";
import { QuestionsUploadDto } from "../model/QuestionsModel";

export function generateId(): string {
  const idSections = v4().toString().split("-");
  let id = "";
  idSections.map((p) => {
    id += p;
  });
  return id;
}

export function getQuestionsYear() {
  const data: number[] = [];
  for (let i = 1990; i <= parseInt(dayjs().format("YYYY")) - 1; i++) {
    data.push(i);
  }
  return data.sort((a, b) => (a < b ? 1 : -1));
}

export function validateQuestionsUploadInfo(info: QuestionsUploadDto) {
  if (info.questions.length <= 0) {
    throw "please select questions to upload";
  }
  if (!info.subject || info.subject.trim().length <= 0) {
    throw "please choose subject";
  }
  if (!info.educationalLevel || info.educationalLevel.trim().length <= 0) {
    throw "please choose educational level";
  }
  if (!info.year || info.year.trim().length <= 0) {
    throw "please select year";
  }
}
