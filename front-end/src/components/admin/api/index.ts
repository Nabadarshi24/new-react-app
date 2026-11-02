import { makeGetRequest, makePostRequest } from "../../libs/Axios";
import { TypeDashboardDetails, TypeUser, TypeUserCreate } from "../types";

export const getDashboardDetails = async () => {
  return await makeGetRequest<TypeDashboardDetails>("/admin/dashboard");
};

export const getAllUsers = async () => {
  return await makeGetRequest<TypeUser[]>("/admin/user/all");
};

export const createUser = async (payload: TypeUserCreate) => {
  return await makePostRequest("/admin/user/create", payload);
};

export const deleteUser = async (id: string) => {
  return await makePostRequest(`/admin/user/delete/${id}`);
};
