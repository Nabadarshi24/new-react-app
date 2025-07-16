export type RequestResponseListData = {
  items: Record<string, any>[];
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

export type ApiResponseList = TypeResponseObject<RequestResponseListData>;
export type ApiResponseObject<T extends Record<string, any> = Record<string, any>> = TypeResponseObject<RequestResponseObjectData<T>>;