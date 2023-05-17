import { AccountRole } from "../enum/account.role";
import { AccountStatus } from "../enum/account.status";
import { Gender } from "../enum/gender";
import FileModel from "./FileModel";

export default interface AccountModel extends CreateAccountDto {
  accountId: string;
  _id: string;
  gender: Gender;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  token?: string;
  authenticated: boolean;
  profileImage: FileModel | null;
}

export interface CreateAccountDto {
  name: string;
  email: string;
  phoneNumber: string;
  role: AccountRole;
  status: AccountStatus;
}
