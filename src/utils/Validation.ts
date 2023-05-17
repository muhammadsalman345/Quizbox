import { PricingDto } from "../model/PricingModel";

export function validateNewPricingInfo(info: PricingDto) {
  if (!info.tag || info.tag.length <= 0) {
    throw "Pricing Tag Required";
  }
  if (!info.category || info.category.length <= 0) {
    throw "Pricing Category Required";
  }
  if (!info.rate || info.rate.length <= 0) {
    throw "Pricing Rate Required";
  }
  if (info.features.length <= 0) {
    throw "Pricing Features Required";
  }
}
