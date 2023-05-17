export default interface PagedResult<T> {
  page: number;
  pageSize: number;
  results: T[];
  totalDocuments: number;
  totalPages: number;
}
