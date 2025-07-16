import { makePostRequest } from "../../libs/Axios";
import { ApiResponseObject } from "../../libs/types";
import { TypeLogin, TypeSignInOtpPayload, TypeSignInOtpResponse, TypeSignInResponse } from "../types";

export const login = async (payload: TypeLogin): Promise<ApiResponseObject<TypeSignInResponse>> => {
  return await makePostRequest("/account/sign-in", payload);
};

export const verifyOtp = async (payload: TypeSignInOtpPayload): Promise<ApiResponseObject<TypeSignInOtpResponse>> => {
  return await makePostRequest("/account/sign-in-otp", payload);
};