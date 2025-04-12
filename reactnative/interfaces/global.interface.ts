export interface IBaseResponse<T = unknown> {
  status: boolean;
  message: string;
  data?: T;
}
