import { makeGetRequest } from "../../libs/Axios";
import { TypeDashboardDetails } from "../types";

export const getDashboardDetails = async () => {
  return await makeGetRequest<TypeDashboardDetails>("/admin/dashboard");
};
