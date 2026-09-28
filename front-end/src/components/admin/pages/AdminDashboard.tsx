import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router";
import { TypeDashboardDetails } from "../types";
import { getDashboardDetails } from "../api";
import { useAccountStore } from "../../stores/GlobalStore";
import { dashboardCardItems } from "./parts/DashboardCardItems";
import Dashboardcard from "./parts/Dashboardcard";

// One table cell that works in both layouts:
// - md and up (>= 768px): a normal table cell (the <thead> shows the labels)
// - below md: a flex row with the label on the left and the value on the right
const Cell = ({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) => (
  <td className="tw:flex tw:md:table-cell tw:md:px-5 tw:md:py-3">
    <span className="tw:flex tw:w-32 tw:shrink-0 tw:items-center tw:bg-slate-100 tw:px-4 tw:py-3 tw:text-xs tw:font-semibold tw:uppercase tw:tracking-wide tw:text-slate-500 tw:md:hidden">
      {label}
    </span>
    <span
      className={`tw:min-w-0 tw:flex-1 tw:break-all tw:px-4 tw:py-3 tw:md:break-normal tw:md:p-0 ${className}`}
    >
      {children}
    </span>
  </td>
);

const AdminDashboard = () => {

  const [dashboardDetails, setDashboardDetails] = useState<TypeDashboardDetails>();

  const setLoading = useAccountStore(store => store.setIsLoading);

  const loadDashboardDetails = async () => {
    try {
      setLoading(true);

      const response = await getDashboardDetails();

      if (response.success && response.data) {
        setDashboardDetails(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardDetails()
  }, [])

  return (
    dashboardDetails && (
      <div>
        <h1 className="tw:mb-6 tw:text-2xl tw:font-bold tw:text-slate-900">
          Admin Dashboard
        </h1>

        <div className="tw:mb-8 tw:grid tw:grid-cols-1 tw:gap-6 tw:md:grid-cols-3">
          {
            dashboardCardItems.map((card, index) => (
              <Dashboardcard
                key={index}
                cardTitle={card.cardTitle}
                cardLink={card.cardLink}
                cardLinkText={card.cardLinkText}
                cardValue={card.format ? parseFloat(card.format(dashboardDetails[card.statKey])) : dashboardDetails[card.statKey]}
              />
            ))
          }
        </div>

        <h2 className="tw:mb-3 tw:text-lg tw:font-bold tw:text-slate-900">Recent Orders</h2>

        {/* Wrapper chrome (border/bg) only on md+; on mobile each order is its own card */}
        <div className="tw:md:overflow-x-auto tw:md:rounded-lg tw:md:border tw:md:border-slate-200 tw:md:bg-white">
          <table className="tw:block tw:w-full tw:text-left tw:text-sm tw:md:table">
            {/* Header row is hidden on mobile: each cell carries its own label instead */}
            <thead className="tw:hidden tw:bg-slate-100 tw:text-xs tw:uppercase tw:tracking-wide tw:text-slate-500 tw:md:table-header-group">
              <tr>
                <th className="tw:px-5 tw:py-3 tw:font-semibold">Order ID</th>
                <th className="tw:px-5 tw:py-3 tw:font-semibold">User</th>
                <th className="tw:px-5 tw:py-3 tw:font-semibold">Total Price</th>
                <th className="tw:px-5 tw:py-3 tw:font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="tw:block tw:md:table-row-group">
              {dashboardDetails.recentOrders.length === 0 ? (
                <tr className="tw:block tw:md:table-row">
                  <td
                    colSpan={4}
                    className="tw:block tw:px-5 tw:py-8 tw:text-center tw:text-slate-500 tw:md:table-cell"
                  >
                    No orders yet.
                  </td>
                </tr>
              ) : (
                dashboardDetails.recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="tw:block tw:overflow-hidden tw:border-x tw:border-b tw:border-slate-200 tw:bg-white tw:first:rounded-t-lg tw:first:border-t tw:last:rounded-b-lg tw:md:table-row tw:md:overflow-visible tw:md:border-0 tw:md:border-t tw:md:border-slate-100 tw:md:first:rounded-none tw:md:last:rounded-none"
                  >
                    <Cell label="Order ID" className="tw:font-medium tw:text-slate-700">
                      <Link to={`/admin/orders/${order._id}`} className="tw:hover:underline">
                        {order._id}
                      </Link>
                    </Cell>
                    <Cell label="User" className="tw:text-slate-600">
                      {order.user?.name ?? "—"}
                    </Cell>
                    <Cell label="Total Price" className="tw:text-slate-600">
                      ${order.totalPrice.toFixed(2)}
                    </Cell>
                    <Cell label="Status" className="tw:text-slate-600">
                      {order.status}
                    </Cell>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default AdminDashboard;
