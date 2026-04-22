import { makeGetRequest } from "../../libs/Axios";
import { ApiResponseObject } from "../../libs/types";
import { TypeFilterOption } from "../types";

export const getFilterOptions = async (): Promise<ApiResponseObject<TypeFilterOption[]>> => {
    return await makeGetRequest("/product/filter-option");
};