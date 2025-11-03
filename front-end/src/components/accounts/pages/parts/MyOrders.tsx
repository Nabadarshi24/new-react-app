import {
  useEffect,
  useState
} from 'react';

export const MyOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: { city: "Newyork", country: "USA" },
          totalPrice: 100,
          isPaid: true,
          orderedItems: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=1"
            }
          ]
        },
        {
          _id: "34567",
          createdAt: new Date(),
          shippingAddress: { city: "Newyork", country: "USA" },
          totalPrice: 100,
          isPaid: true,
          orderedItems: [
            {
              name: "Product 2",
              image: "https://picsum.photos/500/500?random=2"
            }
          ]
        }
      ]

      setOrders(mockOrders);
    }, 1000)
  }, [])

  return (
    <div className="tw:max-w-7xl tw:mx-auto tw:p-4 tw:sm:p-6">
      <h2 className="tw:text-xl tw:sm:text-2xl tw:font-bold tw:mb-6">My Orders</h2>
      <div className="tw:relative tw:shadow-md tw:sm:rounded-lg tw:overflow-hidden">
        <table className="tw:min-w-full tw:text-left tw:text-gray-500">
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
                          src={order.orderedItems[0].image}
                          alt={order.orderedItems[0].name}
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
                        {order.orderedItems.length}
                      </td>
                      <td className="tw:py-2 tw:px-2 tw:sm:px-4">
                        ${order.totalPrice}
                      </td>
                      <td className="tw:py-2 tw:px-2 tw:sm:px-4">
                        <span className={`${order.isPaid
                          ? "tw:bg-green-100 tw:text-green-500"
                          : "tw:bg-red-100 tw:text-red-500"}
                            tw:px-2 tw:py-1 tw:text-xs tw:sm:text-sm tw:rounded-full`}
                        >
                          {order.isPaid ? "Paid" : "Not Paid"}
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
    </div>

  );
};
