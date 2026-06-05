export type RequestResponseListData<T extends Record<string, any>> = {
  items: T[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type RequestResponseObjectData<T> = T;

export type TypeResponseObject<T extends Record<string, any>> = {
  data?: T;
  success?: boolean;
  successMessage?: string;
  errors?: any[] | Record<string, any>;
  notes?: string[];
  alerts?: string[];
  faultTags?: string[];
};

export type ApiResponseList<T extends Record<string, any> = Record<string, any>> = TypeResponseObject<RequestResponseListData<T>>;
export type ApiResponseObject<T extends Record<string, any> = Record<string, any>> = TypeResponseObject<RequestResponseObjectData<T>>;