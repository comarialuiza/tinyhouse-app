export type Nullable<T> = T | null | undefined;

export const isNonNullable = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined;
export const isNullable = (value: any): value is null | undefined => value === null || value === undefined;
