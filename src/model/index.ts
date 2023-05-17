export interface EducationalInfoModel {
  schoolName: string;
  startDate: string;
  endDate: string;
  program: string;
  id: string;
}

export interface WorkExperienceInfoModel {
  jobTitle: string;
  id: string;
  startDate: string;
  endDate: string;
  company: string;
  role: string;
}

export interface CourseDurationModel {
  startDate: string;
  period: CoursePeriod;
  duration: number;
}

export interface FeedCommentModel {
  userId: string;
  comment: string;
  likes: string[];
  id: string;
  createdAt: string;
}

export interface FileInfoModel {
  url: string;
  id: string;
  assetId: string;
  width: number;
  height: number;
  format: string;
  type: string;
  size: number;
  secureUrl: string;
}

export interface DeviceInfoModel {
  name: string;
  id: string;
}

export interface SocialLinksModel {
  id: string;
  title: string;
  url: string;
}

export enum CoursePeriod {
  Weeks = "weeks",
  Days = "days",
  Months = "months",
  Years = "years",
}

export enum CourseType {
  Paid = "paid",
  Free = "free",
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
