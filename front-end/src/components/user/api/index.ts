import { TypeUserProfile } from "../../accounts/types";
import { makeGetRequest } from "../../libs/Axios";

export const getUserProfile = async () => {
  return await makeGetRequest<TypeUserProfile>('/user/profile');
};