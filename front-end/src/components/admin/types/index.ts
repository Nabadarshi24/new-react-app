import { TypeOrderDetails } from "../../order/types";

export type TypeDashboardDetails = {
  revenue: number;
  totalOrders: number;
  totalProducts: number;
  recentOrders: TypeOrderDetails[];
};

export type TypeUser = {
  _id?: string;
  name: string;
  email: string;
  role: string;
};

export type TypeUserCreate = {
  name: string;
  email: string;
  role: string;
};
