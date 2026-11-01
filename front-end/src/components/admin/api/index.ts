import { makeGetRequest } from "../../libs/Axios";
import { TypeDashboardDetails, TypeUser } from "../types";

export const getDashboardDetails = async () => {
  return await makeGetRequest<TypeDashboardDetails>("/admin/dashboard");
};

export const getAllUsers = async () => {
  return await makeGetRequest<TypeUser[]>("/admin/user/all");
};

