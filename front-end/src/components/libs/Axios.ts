import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponseObject } from "./types";
import { T } from "react-router/dist/development/route-data-H2S3hwhf";

const baseUrl = "https://api.planability-dev.com.au/";

export const axiosInstance = axios.create({
  baseURL: baseUrl
});

axiosInstance.interceptors.request.use(request => {
  console.log({ request });

  return request;
});

axiosInstance.interceptors.response.use(response => {
  console.log({ response });

  return response;
});

export const makePostRequest = async <T extends Record<string, any>>(
  url: string,
  data: Record<string, any>
) => {
  const requestConfig: AxiosRequestConfig = {
    url,
    data,
    method: "POST"
  };

  try {
    const response = await axiosInstance.request<ApiResponseObject<T>>(requestConfig);
    // console.log({ axiosResponse: response });

    if (response.status == 200) {
      console.log("Request has succeeded");
    }

    return response.data;
  } catch (error) {
    console.log({ error })

    if (error.code === "ECONNABORTED") {
      throw new Error("Request took too long to execute!");
    }

    if (!error.response) {
      throw new Error("Unknown api or network error");
    }

    const response = error.response as AxiosResponse<ApiResponseObject<T>>;

    if (response.status >= 400 && response.status <= 500) {
      
    }
  }
};