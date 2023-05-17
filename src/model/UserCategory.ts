export default interface UserCategory extends UserCategoryDto {
  _id: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCategoryDto {
  title: string;
  description: string;
}
