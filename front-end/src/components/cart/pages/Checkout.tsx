// import React from 'react'
import * as Yup from "yup";
import { composeInitialState } from "../../utils/Helpers";
import { TypeShippingAddress } from "../types";
import { useHookForm } from "../../libs/HookForm";
import { Form } from "../../form/Form";
import { Input } from "../../form/Input";

const Checkout = () => {

  const { initialState, names, labels } = composeInitialState<TypeShippingAddress>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: ""
  });

  const schema = Yup.object<TypeShippingAddress>().shape({
    email: Yup.string().email().required().label(labels.email),
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

  return (
    <div className="checkout-container">
      {/* Left Section */}
      <div className="tw:rounded-lg tw:p-6">
        <h2 className="tw:text-2xl tw:uppercase tw:mb-6">Checkout</h2>
        <Form
          methods={methods}
          onSubmit={() => { }}
        // className="tw:max-w-md tw:p-8 tw:rounded-lg tw:border-gray-500 tw:shadow-sm"
        >
          <div className="row">
            <div className="col-12">
              <Input
                name={names.email}
                label={labels.email}
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
