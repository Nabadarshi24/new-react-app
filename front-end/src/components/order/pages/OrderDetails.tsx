import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { useAccountStore } from '../../stores/GlobalStore';
import { TypeOrderDetails } from '../../cart/types';
import { showErrorMessage } from '../../helper/Helper';
import { getOrderDetails } from '../../cart/api';

const OrderDetails = () => {

  const [orderDetails, setOrderDetails] = useState<TypeOrderDetails>();

  const params = useParams();

  const setLoading = useAccountStore((state) => state.setIsLoading);

  const loadOrderDetails = async () => {
    // TODO: Implement order details loading logic
    try {
      setLoading(true);

      const response = await getOrderDetails(params.orderId);

      if (response.success && response.data) {
        setOrderDetails(response.data);
      } else {
        throw new Error(response.errorMessage);
      }
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderDetails();
  }, []);

  return (
    <div className="tw:max-w-7xl tw:mx-auto tw:sm:px-6">
      <h2 className="tw:text-2xl tw:md:text:3xl tw:font-bold tw:mb-6">Order Details</h2>
      {
        orderDetails ? (
          <div className='tw:p-4 tw:sm:p-6 tw:rounded-lg tw:border'>
            {/* Order Info */}
            <div className="tw:flex tw:flex-col tw:sm:flex-row tw:justify-between tw:mb-8">
              <div>
                <h3 className="tw:text-lg tw:md:text-xl tw:font-semibold">Order ID: #{orderDetails._id}</h3>
                <p className='tw:text-gray-600'>Order Date: {orderDetails.createdAt}</p>
              </div>
              <div className="tw:flex tw:flex-col tw:items-start tw:sm:items-end tw:mt-4 tw:sm:mt-0">
                <span
                  className={`${orderDetails.isPaid
                    ? 'tw:bg-green-100 tw:text-green-700'
                    : 'tw:bg-red-100 tw:text-red-700'
                    } tw:px-3 tw:py-1 tw:rounded-full tw:text-sm tw:font-medium tw:mb-2`}
                >
                  {orderDetails.isPaid ? 'Approved' : 'Pending'}
                </span>
                <span
                  className={`${orderDetails.isDelivered
                    ? 'tw:bg-green-100 tw:text-green-700'
                    : 'tw:bg-yellow-100 tw:text-yellow-700'
                    } tw:px-3 tw:py-1 tw:rounded-full tw:text-sm tw:font-medium tw:mb-2`}
                >
                  {orderDetails.isDelivered ? 'Delivered' : 'Pending Delivery'}
                </span>
              </div>
            </div>

            {/* Customer, Payment, Shipping Info */}
            <div className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:md:grid-cols-3 tw:gap-8 tw:mb-8">
              <div>
                <h4 className='tw:text-lg tw:font-semibold tw:mb-2'>Payment Info</h4>
                <p>Payment Method: {orderDetails.paymentMethod}</p>
                <p>Status: {orderDetails.isPaid ? 'Paid' : 'Unpaid'}</p>
              </div>

              <div>
                <h4 className='tw:text-lg tw:font-semibold tw:mb-2'>Shipping Info</h4>
                {/* <p>Shipping Method: {orderDetails.shippingMethod}</p> */}
                <p>Shipping Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
              </div>
            </div>
            {/* Product list */}
            <div className="overflow-x-auto">
              <h4 className='tw:text-lg tw:font-semibold tw:mb-4'>Products</h4>

              <table className='tw:min-w-full tw:text-gray-600 tw:mb-4'>
                <thead className='tw:bg-gray-100'>
                  <tr>
                    <th className='tw:py-2 tw:px-4'>Name</th>
                    <th className='tw:py-2 tw:px-4'>Unit Price</th>
                    <th className='tw:py-2 tw:px-4'>Quantity</th>
                    <th className='tw:py-2 tw:px-4'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.orderItems.map((item: any) => (
                    <tr key={item._id} className='tw:border-b'>
                      <td className='tw:py-2 tw:px-4 tw:flex tw:items-center'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='tw:w-12 tw:h-12 tw:object-cover tw:rounded-lg tw:mr-4'
                        />
                        <Link
                          to={`/product/details/${item._id}`}
                          className='tw:text-blue-500 tw:hover:underline'
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className='tw:py-2 tw:px-4'>{item.price}</td>
                      <td className='tw:py-2 tw:px-4'>{item.quantity}</td>
                      <td className='tw:py-2 tw:px-4'>${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Back to Orders Page */}
            <Link
              to='/orders'
              className='tw:bg-blue-500 tw:text-white tw:px-4 tw:py-2 tw:rounded-lg tw:hover:bg-blue-600 tw:transition-colors'
            >
              Back to Orders
            </Link>
          </div>
        ) : (
          <p>
            No order details found.
          </p>
        )
      }
    </div>
  )
};

export default OrderDetails;
