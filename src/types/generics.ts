export type Maybe<T> = T | undefined;

export type Nullable<T> = T | null;

export type DataValidator<T> = (data: T) => boolean | Promise<boolean>;
