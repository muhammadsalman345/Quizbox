export interface ResponseModel<T> {
  data: T;
  message: string;
  error?: string;
  code: number;
}
