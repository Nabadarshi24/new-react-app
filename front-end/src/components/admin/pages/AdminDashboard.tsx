import { useEffect, useState } from "react";
import { Link } from "react-router";
import { TypeDashboardDetails } from "../types";
import { getDashboardDetails } from "../api";
import { useAccountStore } from "../../stores/GlobalStore";

// Static placeholder data matching the reference design.
// Only the Orders section of this admin area is API-integrated;
// these summary cards are display-only for now.
// const stats = {
//   revenue: 319.94,
//   totalOrders: 4,
//   totalProducts: 40,
// };

// const recentOrders = [
//   {
//     id: "67540ced3376121b361a0ed0",
//     user: "Admin User",
//     totalPrice: 199.96,
//     status: "Processing",
//   },
//   {
//     id: "67540d3ca67b4a70e434e092",
//     user: "Admin User",
//     totalPrice: 40,
//     status: "Processing",
//   },
//   {
//     id: "675bf2c6ca77bd83eefd7a18",
//     user: "Admin User",
//     totalPrice: 39.99,
//     status: "Processing",
//   },
//   {
//     id: "675c24b09b88827304bd5cc1",
//     user: "Admin User",
//     totalPrice: 39.99,
//     status: "Processing",
//   },
// ];

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
          <div className="tw:rounded-lg tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:shadow-sm">
            <p className="tw:text-sm tw:font-medium tw:text-slate-500">Revenue</p>
            <p className="tw:mt-1 tw:text-2xl tw:font-bold tw:text-slate-900">
              ${dashboardDetails.revenue.toFixed(2)}
            </p>
          </div>

          <div className="tw:rounded-lg tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:shadow-sm">
            <p className="tw:text-sm tw:font-medium tw:text-slate-500">Total Orders</p>
            <p className="tw:mt-1 tw:text-2xl tw:font-bold tw:text-slate-900">
              {dashboardDetails.totalOrders}
            </p>
            <Link
              to="/admin/orders"
              className="tw:mt-1 tw:inline-block tw:text-sm tw:text-blue-600 tw:hover:underline"
            >
              Manage Orders
            </Link>
          </div>

          <div className="tw:rounded-lg tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:shadow-sm">
            <p className="tw:text-sm tw:font-medium tw:text-slate-500">Total Products</p>
            <p className="tw:mt-1 tw:text-2xl tw:font-bold tw:text-slate-900">
              {dashboardDetails.totalProducts}
            </p>
            <span className="tw:mt-1 tw:inline-block tw:cursor-default tw:text-sm tw:text-blue-600">
              Manage Products
            </span>
          </div>
        </div>

        <h2 className="tw:mb-3 tw:text-lg tw:font-bold tw:text-slate-900">Recent Orders</h2>

        <div className="tw:overflow-x-auto tw:rounded-lg tw:border tw:border-slate-200 tw:bg-white">
          <table className="tw:w-full tw:text-left tw:text-sm">
            <thead className="tw:bg-slate-100 tw:text-xs tw:uppercase tw:tracking-wide tw:text-slate-500">
              <tr>
                <th className="tw:px-5 tw:py-3 tw:font-semibold">Order ID</th>
                <th className="tw:px-5 tw:py-3 tw:font-semibold">User</th>
                <th className="tw:px-5 tw:py-3 tw:font-semibold">Total Price</th>
                <th className="tw:px-5 tw:py-3 tw:font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardDetails.recentOrders.map((order) => (
                <tr key={order._id} className="tw:border-t tw:border-slate-100">
                  <td className="tw:px-5 tw:py-3 tw:font-medium tw:text-slate-700">
                    {order._id}
                  </td>
                  <td className="tw:px-5 tw:py-3 tw:text-slate-600">{order.user.name}</td>
                  <td className="tw:px-5 tw:py-3 tw:text-slate-600">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="tw:px-5 tw:py-3 tw:text-slate-600">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default AdminDashboard;
