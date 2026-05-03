import { makeGetRequest } from "../../libs/Axios";
import { ApiResponseList, ApiResponseObject } from "../../libs/types";
import { TypeFilterOption, TypeProduct } from "../types";

export const getFilterOptions = async (): Promise<ApiResponseObject<TypeFilterOption[]>> => {
  return await makeGetRequest("/product/filter-option");
};

export const getAllProducts = async (params?: Record<string, any>): Promise<ApiResponseList<TypeProduct>> => {
  // if (!params) {
  //     return await makeGetRequest("/product/all");
  // }
  return await makeGetRequest("/product/all", params);
};

export const getProductDetails = async (id: string): Promise<ApiResponseObject<TypeProduct>> => {
  // if (!params) {
  //     return await makeGetRequest("/product/all");
  // }
  return await makeGetRequest(`/product/details/${id}`);
};

export const getSimilarProducts = async (id: string): Promise<ApiResponseObject<TypeProduct[]>> => {
  return await makeGetRequest(`/product/similar/${id}`);
};

export const getProductSizeOptions = async (): Promise<ApiResponseObject<TypeFilterOption[]>> => {
  return await makeGetRequest("/product/size-option");
};
