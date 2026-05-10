import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponseObject } from "./types";
import { setLocalStorage } from "../helper/Helper";
// import { T } from "react-router/dist/development/route-data-H2S3hwhf";

const navigate = (path: string) => {
  window.location.href = path;
};

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(request => {
  console.log({ request });
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // debugger
    console.log({ error });

    const originalRequest = error.config;

    // Check for 401 and ensure we haven't retried this request yet
    if (error.response.status === 401
      //  && !originalRequest._retry
      ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        // Call your refresh endpoint
        const refreshTokenResponse = await axios.post(`${baseUrl}/user/claim/access-token`, {
          refreshToken,
        });

        console.log("Refresh token response:", refreshTokenResponse);

        // Save new token
        setLocalStorage("accessToken", refreshTokenResponse.data.data.token);

        // Update header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${refreshTokenResponse.data.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // Refresh failed (e.g., refresh token expired)
        console.log("Refresh failed:", error);

        navigate("/login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("loggedUser");

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
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

    return {
      ...response.data,
    };
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

export const makeGetRequest = async <T extends Record<string, any>>(
  url: string,
  params?: Record<string, any>
) => {
  const requestConfig: AxiosRequestConfig = {
    url,
    params,
    method: "GET"
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
      // if (response.status === 401) {
      //   // TODO: Refresh token
      //   console.log("Token expired, refreshing...");
      //   debugger
      //   const refreshTokenResponse = await axiosInstance.request({
      //     url: "/user/claim/access-token",
      //     data: {
      //       refreshToken: localStorage.getItem("refreshToken")
      //     },
      //     method: "POST"
      //   });
      //   console.log({ refreshTokenResponse });

      //   if (refreshTokenResponse.status === 200) {
      //     console.log("Token refreshed successfully");
      //     setLocalStorage("accessToken", refreshTokenResponse.data.data.token);
      //   }

      //   if (refreshTokenResponse.status === 401) {
      //     navigate("/login");
      //     localStorage.removeItem("accessToken");
      //     localStorage.removeItem("refreshToken");
      //     localStorage.removeItem("loggedUser");
      //   }
      // }
    }
  }
};

export const makeDeleteRequest = async <T extends Record<string, any>>(
  url: string,
  data?: Record<string, any>
) => {
  const requestConfig: AxiosRequestConfig = {
    url,
    data,
    method: "DELETE"
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

    // if (error.code === "ECONNABORTED") {
    //   throw new Error("Request took too long to execute!");
    // }

    if (!error.response) {
      throw new Error("Unknown api or network error");
    }

    const response = error.response as AxiosResponse<ApiResponseObject<T>>;

    if (response.status >= 400 && response.status <= 500) {

    }
  }
};