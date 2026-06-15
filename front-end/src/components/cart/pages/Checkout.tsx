// import React from 'react'
import * as Yup from "yup";
import { composeInitialState } from "../../utils/Helpers";
import { TypeShippingAddress } from "../types";
import { useHookForm } from "../../libs/HookForm";
import { Form } from "../../form/Form";
import { Input } from "../../form/Input";
import { useState } from "react";
import { SubmitButton } from "../../form/SubmitButton";
import { createPayment } from "../api";

const Checkout = () => {

  const [checkoutId, setCheckoutId] = useState<string | null>(null);
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

  const handleBkashPayment = async () => {
    try {
      const payload = {
        amount: 50
      }
      const response = await createPayment(payload)
      console.log(response?.data)
    } catch (error) {

    }
  };

  const onSubmit = async () => {
    try {
      setCheckoutId("123");
    } catch (error) {

    }
  };

  return (
    <div className="checkout-container">
      {/* Left Section */}
      <div className="tw:rounded-lg tw:p-6">
        <h2 className="tw:!text-2xl tw:uppercase tw:!mb-6">Checkout</h2>
        <Form
          methods={methods}
          onSubmit={onSubmit}
        // className="tw:max-w-md tw:p-8 tw:rounded-lg tw:border-gray-500 tw:shadow-sm"
        >
          <div className="row">
            <h3 className="tw:!text-lg tw:!mb-4">Contact Details</h3>
            <div className="col-12">
              <Input
                name=""
                value="abc@example.com"
                label="Email"
                disabled
              />
            </div>
            <h3 className="tw:!text-lg tw:!mb-4">Delivery</h3>
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
            {
              !checkoutId
                ? <div className="col-12">
                  <SubmitButton
                    className="tw:!bg-black tw:!w-full"
                    label="Continue to Pyment"
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
        </Form>
      </div>
      {/* Right Section */}
      <div className="tw:rounded-lg tw:p-6">

      </div>
    </div>
  );
};

export default Checkout;
