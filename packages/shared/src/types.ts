export type ColorMode = 'light' | 'dark';

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

export type QueryOptions = {
  filter?: string;
  search?: string;
  count?: string;
  orderBy?: string;
  skip?: string;
  top?: string;
};

export type Base = {
  id: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string;
  isDeleted: boolean;
};

export type PaginatedResponse<T> = {
  count?: number;
  value: T[];
};
