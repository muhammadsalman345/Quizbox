import { CourseDurationModel, CourseType, FileInfoModel } from ".";
import ProfileModel, { UserProfileInfo } from "./ProfileModel";
import UserModel from "./UserModel";

export interface CourseModel extends CourseDto {
  _id: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  registeredStudents: string[];
  status: string;
  courseStatus: string;
  userId: string;
  coverImage: FileInfoModel;
  trailer?: FileInfoModel;
  title: string;
  duration: CourseDurationModel;
  fee: number;
  description: string;
}

export interface CourseDto {
  courseType: CourseType;
  fee: number;
  title: string;
  description: string;
  duration: CourseDurationModel;
}

export interface CourseGridModel {
  courseId: string;
  createdAt: string;
  students: number;
  status: string;
  userId: string;
  fee: number;
  description: string;
  startDate: string;
  period: string;
  duration: number;
  id: string;
  title: string;
  type: string;
}

export function formatCourseGridModel(
  courses: CourseModel[]
): CourseGridModel[] {
  return courses.map((c) => {
    return {
      userId: c.userId,
      courseId: c.courseId,
      status: c.status,
      createdAt: c.createdAt,
      startDate: c.duration.startDate,
      duration: c.duration.duration,
      fee: c.fee,
      period: c.duration.period,
      students: c.registeredStudents.length,
      description: c.description,
      title: c.title,
      id: c._id,
      type: c.courseType,
    };
  });
}

export interface CourseInfo {
  course: CourseModel;
  author: {
    user: UserModel;
    profile: ProfileModel;
  };
  students: UserProfileInfo[];
}
