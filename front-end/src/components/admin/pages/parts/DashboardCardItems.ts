import { TypeDashboardDetails } from "../../types";

type StatKey = Exclude<keyof TypeDashboardDetails, "recentOrders">;

export type DashboardCardConfig = {
  statKey: StatKey; // which field of the API response fills cardValue
  cardTitle: string;
  cardLink?: string;
  cardLinkText?: string;
  format?: (value: number) => string;
};

export const dashboardCardItems: DashboardCardConfig[] = [
  {
    statKey: "revenue",
    cardTitle: "Revenue",
    format: (value) => `${value.toFixed(2)}`,
  },
  {
    statKey: "totalOrders",
    cardTitle: "Total Orders",
    cardLink: "/admin/orders",
    cardLinkText: "Manage Orders",
  },
  {
    statKey: "totalProducts",
    cardTitle: "Total Products",
    cardLink: "/admin/products",
    cardLinkText: "Manage Products",
  },
];