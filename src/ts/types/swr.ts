export type SWRResult<T> = {
  data?: T;
  isLoading: boolean;
  isError: boolean;
};
