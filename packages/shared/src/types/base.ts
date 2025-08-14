export type ColorMode = 'light' | 'dark';

export type BaseEntity = {
  id: string;
};

export type QueryOptions = {
  filter?: string;
  search?: string;
  count?: string;
  orderBy?: string;
  skip?: string;
  top?: string;
};

export type PaginatedResponse<T> = {
  count?: number;
  value: T[];
};


export type ErrorResponse<T> = {
  status: number;
  message: string;
  errors: Error<T>[];
};

export type Error<T> = {
  property: keyof T;
  code: number;
  message: string;
};
