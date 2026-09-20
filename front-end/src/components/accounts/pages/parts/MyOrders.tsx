import {
  useEffect,
  useState
} from 'react';
import { useAccountStore } from '../../../stores/GlobalStore';
import { getOrderDetails, getOrders } from '../../../cart/api';
import { showErrorMessage } from '../../../helper/Helper';
import { TypeOrderDetails } from '../../../cart/types';

export const MyOrders = () => {

  const [orders, setOrders] = useState<TypeOrderDetails[]>([]);

  const setLoading = useAccountStore(store => store.setIsLoading);

  const loadOrderDetails = async () => {
    // TODO: Implement order details loading logic
    try {
      setLoading(true);

      const response = await getOrders();

      if (response.success && response.data) {
        setOrders(response.data);
      } else {
        throw new Error(response.errorMessage);
      }
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrderDetails();
  }, [])

  return (
    <div className="tw:max-w-7xl tw:mx-auto tw:p-4 tw:sm:p-6">
      <h2 className="tw:text-xl tw:sm:text-2xl tw:font-bold tw:mb-6">My Orders</h2>
      {
        orders &&
        <div className="tw:relative tw:shadow-md tw:sm:rounded-lg">
          <table className="tw:min-w-full tw:text-left tw:text-gray-500 tw:overflow-x-auto">
            <thead className="tw:bg-gray-100 tw:text-xs tw:text-gray-700 tw:uppercase">
              <tr>
                <th className="tw:py-2 tw:px-4 tw:sm:py-3">Image</th>
                <th className="tw:py-2 tw:px-4 tw:sm:py-3">Order ID</th>
                <th className="tw:py-2 tw:px-4 tw:sm:py-3">Crated At</th>
                <th className="tw:py-2 tw:px-4 tw:sm:py-3">Shipping Address</th>
                <th className="tw:py-2 tw:px-4 tw:sm:py-3">Items</th>
                <th className="tw:py-2 tw:px-4 tw:sm:py-3">Price</th>
                <th className="tw:py-2 tw:px-4 tw:sm:py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.length > 0 ? (
                  orders.map(order => {
                    return (
                      <tr key={order._id} className="tw:border-b tw:border-gray-200 tw:hover:bg-gray-50 tw:cursor-pointer">
                        <td className="tw:py-2 tw:px-2 tw:sm:px-4">
                          <img
                            src={order.orderItems[0].image}
                            alt={order.orderItems[0].name}
                            className="tw:w-10 tw:h-10 tw:sm:w-12 tw:sm:h-12 tw:object-cover tw:rounded-lg"
                          />
                        </td>
                        <td className="tw:py-2 tw:px-2 tw:sm:px-4 tw:font-medium tw:text-gray-900 tw:whitespace-nowrap"># {order._id}</td>
                        <td className="tw:py-2 tw:px-2 tw:sm:px-4">
                          {new Date(order.createdAt).toLocaleDateString()} {" "}
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="tw:py-2 tw:px-2 tw:sm:px-4">
                          {order.shippingAddress
                            ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                            : "N/A"
                          }
                        </td>
                        <td className="tw:py-2 tw:px-2 tw:sm:px-4">
                          {order.orderItems.length}
                        </td>
                        <td className="tw:py-2 tw:px-2 tw:sm:px-4">
                          ${order.totalPrice}
                        </td>
                        <td className="tw:py-2 tw:px-2 tw:sm:px-4 tw:min-w-[110px]">
                          <span className={`${order.isPaid
                            ? "tw:bg-green-100 tw:text-green-500"
                            : "tw:bg-red-100 tw:text-red-500"}
                            tw:px-2 tw:py-1 tw:text-xs tw:sm:text-sm tw:rounded-full`}
                          >
                            {order.isPaid ? "Paid" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="tw:text-center tw:py-4 tw:px-4 tw:text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      }
    </div>

  );
};
