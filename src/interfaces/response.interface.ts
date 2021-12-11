export interface IPaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
