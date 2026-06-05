import { makeGetRequest } from "../../libs/Axios";

export const getUserProfile = async () => {
  return await makeGetRequest('/user/profile');
};