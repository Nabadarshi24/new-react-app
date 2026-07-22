import {
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router";

const OrderConfirmation = () => {

  const [checkoutDetails, setCheckoutDetails] = useState(null);

  const navigate = useNavigate();

  const calculateEstimatedDeliveryDate = (createdAt: Date) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 7);
    return orderDate.toLocaleDateString();
  };

  useEffect(() => {
    // Prevent the default back button transition
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Programmatically route to the new custom path
      navigate("/collection/all");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <div className='tw:max-w-4xl tw:mx-auto tw:p-6 tw:bg-white tw:rounded-lg tw:shadow-md'>
      <h1 className='tw:text-4xl tw:font-bold tw:text-center tw:text-emerald-700 tw:mb-8'>
        Thank You for Your Order!
      </h1>

      {
        // TODO: Add order details here
        checkoutDetails && (
          <div className="tw:p-6 tw:rounded-lg tw:border">
            <div className="tw:flex tw:justify-between tw:mb-20">
              <div>
                <h2 className="tw:text-xl tw:font-semibold">Order ID: {checkoutDetails._id}</h2>
                <p className=" tw:text-gray-500">Order Date: {checkoutDetails.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="tw:text-emerald-700 text-sm">Estimated Delivery Date: {calculateEstimatedDeliveryDate(checkoutDetails.createdAt)}</p>
            </div>
            <div className="tw:mb-20">
              {
                checkoutDetails.checkoutItems.map((item: any) => (
                  <div
                    key={item._id}
                    className="tw:flex tw:items-center tw:mb-4"
                  >
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="tw:w-16 tw:h-16 tw:object-cover tw:rounded-md tw:mr-4"
                    />
                    <div>
                      <h4 className="tw:text-md tw:font-semibold">{item.productName}</h4>
                      <p className="tw:text-sm tw:text-gray-500">{item.color} | {item.size}</p>
                    </div>
                    <div className="tw:text-right tw:ml-auto">
                      <p className="tw:text-md tw:font-semibold">{item.price}</p>
                      <p className="tw:rext-sm tw:text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="tw:grid tw:grid-cols-2 tw:gap-8">
              <div>
                <h4 className="tw:text-lg tw:font-semibold tw:mb-2">Payment</h4>
                <p className="tw:text-gray-600">Cash on delivery</p>
              </div>

              <div>
                <h4 className="tw:text-lg tw:font-semibold tw:mb-2">Delivery</h4>
                <p className="tw:text-gray-600">{checkoutDetails.shippingAddress.address}</p>
                <p className="tw:text-gray-600">{checkoutDetails.shippingAddress.city}, {" "} {checkoutDetails.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default OrderConfirmation;
