import UserCategory from "./UserCategory";

export default interface BillingRate extends BillingRateDto {
  _id: string;
  rateId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillingRateDto {
  title: string;
  category: UserCategory;
  price: number;
  tag: string;
}
