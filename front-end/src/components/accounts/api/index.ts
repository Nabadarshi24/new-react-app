import { makePostRequest } from "../../libs/Axios";
import { ApiResponseObject } from "../../libs/types";
import { TypeLogin, TypeLoginUserData, TypeSignInOtpPayload, TypeSignInOtpResponse, TypeSignInResponse, TypeUserData, TypeUserProfile } from "../types";

export const login = async (payload: TypeLogin): Promise<ApiResponseObject<TypeSignInResponse>> => {
  return await makePostRequest("/account/sign-in", payload);
};

export const verifyOtp = async (payload: TypeSignInOtpPayload): Promise<ApiResponseObject<TypeSignInOtpResponse>> => {
  return await makePostRequest("/account/sign-in-otp", payload);
};


export const updateUser = (payload: TypeUserProfile) => {
  const loggedUser = localStorage.getItem("loggedUser");
  const user: TypeLoginUserData = JSON.parse(loggedUser);

  // console.log({ user })

  user.firstName = payload.firstName;
  user.lastName = payload.lastName;
  user.userName = payload.firstName.toLocaleLowerCase() + "." + payload.lastName.toLocaleLowerCase();
  user.email = payload.email;
  user.roleLabel = payload.userRole;
  user.isVerified = payload.isVerified;
  user.isDeleted = payload.isDeleted;

  console.log({ user })

  const userData = localStorage.getItem("userData");
  const userDataJson: TypeUserData[] = JSON.parse(userData);

  const userDataJsonIndex = userDataJson.findIndex((x: TypeUserData) => x.id == user.userId);

  userDataJson[userDataJsonIndex].id = user.userId;
  userDataJson[userDataJsonIndex].firstName = user.firstName;
  userDataJson[userDataJsonIndex].lastName = user.lastName;
  // userDataJson[userDataJsonIndex].userName = user.firstName.toLocaleLowerCase() + "." + user.lastName.toLocaleLowerCase();
  userDataJson[userDataJsonIndex].email = user.email;
  userDataJson[userDataJsonIndex].role = user.roleLabel;
  userDataJson[userDataJsonIndex].isVerified = user.isVerified;
  userDataJson[userDataJsonIndex].isDeleted = user.isDeleted;

  localStorage.setItem("userData", JSON.stringify(userDataJson));
  localStorage.setItem("loggedUser", JSON.stringify(user));

  return {
    success: true,
    message: "User updated successfully"
  };
};
