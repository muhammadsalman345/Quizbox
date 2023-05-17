export default interface CategoryModel extends CategoryDto {
  id: string;
  _id: string;
  createdAt: string;
  categoryId: string;
  updatedAt: string;
}

export interface CategoryDto {
  title: string;
  description: string;
}
export const CategoryInfo: CategoryDto = {
  title: "",
  description: "",
};
