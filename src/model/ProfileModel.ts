import {
  EducationalInfoModel,
  FileInfoModel,
  SocialLinksModel,
  WorkExperienceInfoModel,
} from ".";
import UserModel from "./UserModel";

export default interface ProfileModel extends ProfileDto {
  _id: string;
  profileId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  profileImage: FileInfoModel;
  profileViews: string[];
  followers: string[];
  following: string[];
}

export interface ProfileDto {
  educationalInfo: EducationalInfoModel[];
  workExperience: WorkExperienceInfoModel[];
  socialLinks: SocialLinksModel[];
  address: any;
}

export interface UserProfileInfo {
  user: UserModel;
  profile: ProfileModel;
}
