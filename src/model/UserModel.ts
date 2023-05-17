import { CountryType } from ".";

export default interface UserModel {
  name: string;
  email?: string;
  username: string;
  _id: string;
  userType: string;
  authenticated: boolean;
  authenticationCode: boolean;
  phoneNumber?: string;
  token?: string;
  isLogin: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  country: CountryType | null;
}

export interface UserInfo {
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  userType: string;
}
