import { SortDirection } from "../enum/SortDirection";

export default interface BaseFilter {
  page: number;
  pageSize: number;
  sortColumn: string;
  sortDirection?: SortDirection;
}
