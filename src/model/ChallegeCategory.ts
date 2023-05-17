export default interface ChallengeCategory extends CreateChallengeCategoryDto {
  createdAt: string;
  updatedAt: string;
  _id: string;
  categoryId: string;
}

export interface ChallengePrice {
  description: string;
  title: string;
  position: number;
  amount: number;
  id: string;
}

export interface CreateChallengeCategoryDto {
  title: string;
  price: ChallengePrice[];
  description: string;
  numberOfParticipants: number;
}
