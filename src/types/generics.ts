export type Maybe<T> = T | undefined;

export type Nullable<T> = T | null;

export type DataValidator<T> = (data: T) => boolean | Promise<boolean>;

export type ValueOf<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T,
> = {
  [P in keyof T]: T[P];
}[K];
