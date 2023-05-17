import BillingRate from "./BillingRate";
import CategoryModel, { CategoryDto, CategoryInfo } from "./CategoryModel";
import ChallengeCategory from "./ChallegeCategory";
import PricingModel from "./PricingModel";
import UserCategory from "./UserCategory";

export default interface FeaturesModel {
  questionsCategories: CategoryModel[];
  educationLevels: CategoryModel[];
  usersCategory: UserCategory[];
  billingRates: BillingRate[];
  pricing: PricingModel[];
  challengeCategories: ChallengeCategory[];
}

export interface FeatureDto {
  questionCategory: CategoryDto;
  educationalLevel: CategoryDto;
  usersCategory: CategoryDto;
}

export const FeatureInfo: FeatureDto = {
  questionCategory: CategoryInfo,
  educationalLevel: CategoryInfo,
  usersCategory: CategoryInfo,
};
