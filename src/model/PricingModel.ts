import BillingRate from "./BillingRate";
import PricingFeature from "./PricingFeature";

export default interface PricingModel extends Pricing {
  createdAt: string;
  updatedAt: string;
  _id: string;
  pricingId: string;
}

export interface Pricing {
  tag: string;
  rate: BillingRate;
  price: number;
  features: PricingFeature[];
  description: string;
}

export interface PricingDto {
  tag: string;
  rate: string;
  features: PricingFeature[];
  category: string;
  description: string;
}

export const PricingInfo: PricingDto = {
  tag: "",
  rate: "",
  features: [],
  category: "",
  description: "",
};
