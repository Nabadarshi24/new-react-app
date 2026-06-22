// import React from 'react'
import * as Yup from "yup";
import { composeInitialState } from "../../utils/Helpers";
import { TypeCart, TypeShippingAddress } from "../types";
import { useHookForm } from "../../libs/HookForm";
import { Form } from "../../form/Form";
import { Input } from "../../form/Input";
import { useEffect, useState } from "react";
import { SubmitButton } from "../../form/SubmitButton";
import { createPayment, getCartDetails, getPaymentMethodOptions } from "../api";
import { useAccountStore } from "../../stores/GlobalStore";
import { showErrorMessage } from "../../helper/Helper";
import { TypeFilterOption } from "../../products/types";

const Checkout = () => {

  const [paymentMethodOption, setPaymentMethodOption] = useState<TypeFilterOption>();
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [cart, setCart] = useState<TypeCart>();

  const cartId = localStorage.getItem('cartId');
  const setLoading = useAccountStore((store) => store.setIsLoading);

  const { initialState, names, labels } = composeInitialState<TypeShippingAddress>({
    // email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: ""
  });

  const schema = Yup.object<TypeShippingAddress>().shape({
    // email: Yup.string().email().required().label(labels.email),
    firstName: Yup.string().required().label(labels.firstName),
    lastName: Yup.string().required().label(labels.lastName),
    address: Yup.string().required().label(labels.address),
    city: Yup.string().required().label(labels.city),
    postalCode: Yup.string().required().label(labels.postalCode),
    country: Yup.string().required().label(labels.country),
    phone: Yup.string().required().label(labels.phone)
  });

  const methods = useHookForm<TypeShippingAddress>({
    initialState,
    schema
  });

  const loadCartDetails = async () => {
    // TODO: Load cart details from API
    try {
      setLoading(true);

      const response = await getCartDetails(cartId as string);

      if (response?.data && response.success) {
        setCart(response.data);
        // window.dispatchEvent(new Event("storage"));
      } else {
        showErrorMessage(response?.errorMessage as string);
      }
    } catch (error: any) {
      console.log({ error });
      showErrorMessage(error.message)
    } finally {
      setLoading(false);
    }
  };

  const handleBkashPayment = async () => {
    try {
      const payload = {
        amount: 50
      }
      const response = await createPayment(payload)
      // debugger

      if (response?.data && response.success) {
        // TODO: redirect to bkash payment page
        console.log({ data: response.data })
        window.location.href = response.data.bkashURL;
      }
      console.log(response?.data)
    } catch (error) {

    }
  };

  const loadPaymentMethodOptions = async () => {
    // TODO: Load payment method options from API
    try {
      setLoading(true);

      const response = await getPaymentMethodOptions();

      if (response?.data && response.success) {
        setPaymentMethodOption(response.data);
        // window.dispatchEvent(new Event("storage"));
      } else {
        showErrorMessage(response?.errorMessage as string);
      }
    } catch (error: any) {
      console.log({ error });
      showErrorMessage(error.message)
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setCheckoutId("123");
    } catch (error) {

    }
  };

  useEffect(() => {
    loadCartDetails();
    loadPaymentMethodOptions();
  }, []);

  return (
    <div>
      <h2 className="tw:text-2xl tw:font-semibold tw:uppercase tw:mb-6">Checkout</h2>
      <Form
        methods={methods}
        onSubmit={onSubmit}
      // className="tw:max-w-md tw:p-8 tw:rounded-lg tw:border-gray-500 tw:shadow-sm"
      >
        <div className="row">
          {/* Left Section */}
          <div className="col-12 col-md-6">
            <div className="tw:bg-gray-50 tw:rounded-lg tw:p-6">
              <div className="row">
                <h3 className="tw:text-lg tw:mb-4">Contact Details</h3>
                <div className="col-12">
                  <Input
                    name=""
                    value="abc@example.com"
                    label="Email"
                    disabled
                  />
                </div>
                <h3 className="tw:text-lg tw:mb-4">Delivery</h3>
                <div className="col-md-6">
                  <Input
                    name={names.firstName}
                    label={labels.firstName}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    name={names.lastName}
                    label={labels.lastName}
                    required
                  />
                </div>
                <div className="col-12">
                  <Input
                    name={names.address}
                    label={labels.address}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    name={names.city}
                    label={labels.city}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    name={names.postalCode}
                    label={labels.postalCode}
                    required
                  />
                </div>
                <div className="col-12">
                  <Input
                    name={names.country}
                    label={labels.country}
                    required
                  />
                </div>
                <div className="col-12">
                  <Input
                    name={names.phone}
                    label={labels.phone}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="col-12 col-md-6">
            {
              cart &&
              <div className="tw:bg-gray-50 tw:rounded-lg tw:p-6">
                <h3 className="tw:text-lg tw:mb-4">Order Summary</h3>
                <div className="tw:border-t tw:py-4 tw:mb-4">
                  {
                    cart.products.map((product) => (
                      <div key={product.productId} className="tw:flex tw:items-start tw:justify-between tw:py-2 tw:border-b">
                        <div className="tw:flex tw:items-start">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="tw:w-20 tw:h-20 tw:object-cover tw:mr-4"
                          />
                          <div>
                            <h3 className="tw:text-md">{product.name}</h3>
                            <p className="tw:text-gray-500">Size: {product.size}</p>
                            <p className="tw:text-gray-500">Color: {product.color}</p>
                          </div>
                        </div>
                        <p className="tw:text-xl">${product.price.toLocaleString()}</p>
                      </div>
                    ))
                  }
                </div>
                <div className="tw:flex tw:items-center tw:justify-between tw:text-lg tw:mb-4">
                  <p>Subtotal</p>
                  <p className="tw:text-xl">${cart.totalPrice.toLocaleString()}</p>
                </div>
                <div className="tw:flex tw:items-center tw:justify-between tw:text-lg">
                  <p>Shipping</p>
                  <p className="tw:text-xl">Free</p>
                </div>
                <div className="tw:flex tw:items-center tw:justify-between tw:text-lg tw:mt-4 tw:border-t tw:pt-4">
                  <p>Total</p>
                  <p>${cart.totalPrice.toLocaleString()}</p>
                </div>
              </div>
            }

            {
              !checkoutId
                ? <div className="col-12">
                  <SubmitButton
                    className="tw:!bg-black tw:!w-full"
                    label="Confirm Order"
                  />
                </div>
                : <div>
                  <h3 className="tw:!text-lg tw:!mb-4">Pay with bkash</h3>
                  <button
                    className='tw:w-full tw:bg-black tw:text-white tw:py-3 tw:rounded-lg tw:font-semibold tw:text-center tw:cursor-pointer tw:hover:bg-gray-800'
                    onClick={handleBkashPayment}
                  >
                    Bkash Payment
                  </button>
                </div>
            }
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Checkout;
