import {
  useEffect,
  useState
} from "react";
import { useNavigate, useParams } from "react-router";
import { getOrderDetails } from "../api";
import { useAccountStore } from "../../stores/GlobalStore";
import { TypeOrderDetails } from "../types";
import { formatColor } from "../../helper/Helper";

const OrderConfirmation = () => {

  const [orderDetails, setOrderDetails] = useState<TypeOrderDetails>(null);

  const { orderId } = useParams();
  const navigate = useNavigate();

  const setLoading = useAccountStore((store) => store.setIsLoading);

  const calculateEstimatedDeliveryDate = (createdAt: Date) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 7);
    return orderDate.toLocaleDateString();
  };

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await getOrderDetails(orderId);

      if (response.success && response.data) {
        setOrderDetails(response.data);
      } else {
        throw new Error(response.errorMessage);
      }
    } catch (error) {
      console.error("Error loading order details:", error);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    loadOrderDetails();
  }, []);

  return (
    <div className='tw:max-w-4xl tw:mx-auto tw:p-6 tw:bg-white tw:rounded-lg tw:shadow-md'>
      <h1 className='tw:text-4xl tw:font-bold tw:text-center tw:text-emerald-700 tw:mb-8'>
        Thank You for Your Order!
      </h1>

      {
        // TODO: Add order details here
        orderDetails && (
          <div className="tw:p-6 tw:rounded-lg tw:border">
            <div className="tw:flex tw:justify-between tw:mb-10">
              <h2 className="tw:text-xl tw:font-semibold">Order ID: {orderDetails._id}</h2>
              <p className=" tw:text-gray-500">Order Date: {orderDetails.createdAt}</p>
            </div>
            <div className="tw:mb-20px">
              <p className="tw:text-emerald-700 text-sm">Estimated Delivery Date: {calculateEstimatedDeliveryDate(new Date(orderDetails.createdAt))}</p>
            </div>
            <div className="tw:mb-20">
              {
                orderDetails.orderItems.map((item: any) => (
                  <div
                    key={item._id}
                    className="tw:flex tw:items-center tw:mb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="tw:w-16 tw:h-16 tw:object-cover tw:rounded-md tw:mr-4"
                    />
                    <div>
                      <h4 className="tw:text-md tw:font-semibold">{item.name}</h4>
                      <p className="tw:text-sm tw:text-gray-500">{formatColor(item.color)} | {item.size.toUpperCase()}</p>
                    </div>
                    <div className="tw:text-right tw:ml-auto">
                      <p className="tw:text-md tw:font-semibold">Price: {item.price}</p>
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
                <p className="tw:text-gray-600">{orderDetails.shippingAddress.address}</p>
                <p className="tw:text-gray-600">{orderDetails.shippingAddress.city}, {" "} {orderDetails.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default OrderConfirmation;
