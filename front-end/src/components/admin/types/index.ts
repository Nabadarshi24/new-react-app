import { TypeOrderDetails } from "../../order/types";

export type TypeDashboardDetails = {
  revenue: number;
  totalOrders: number;
  totalProducts: number;
  recentOrders: TypeOrderDetails[];
};