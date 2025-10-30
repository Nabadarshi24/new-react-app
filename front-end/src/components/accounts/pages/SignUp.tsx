import { ComponentType, useState } from 'react';
import {
  Link,
  useNavigate
} from 'react-router';
import * as Yup from "yup";
import { TypeSignUp, TypeUserData } from '../types';
import { Form } from '../../form/Form';
import { Input } from '../../form/Input';
import { SubmitButton } from '../../form/SubmitButton';
import { composeInitialState, createUser } from '../../utils/Helpers';
import { useHookForm } from '../../libs/HookForm';
import { Select, TypeDropdownOptions } from '../../form/Select';
import axios from 'axios';

const SignUp = () => {

  const navigate = useNavigate();

  // const [userData, setUserData] = useState<TypeUserData[]>();
  // const [password, setPassword] = useState("");

  const roles: TypeDropdownOptions[] = [
    {
      text: "Admin",
      value: "admin",
      isDisabled: false
    },
    {
      text: "User",
      value: "user",
      isDisabled: false
    }
  ];

  const { initialState, names, labels } = composeInitialState<TypeSignUp>({
    email: "",
    firstName: "",
    lastName: "",
    userRole: "",
    password: ""
  });

  const schema = Yup.object<TypeSignUp>().shape({
    email: Yup.string().email().required().label(labels.email),
    firstName: Yup.string().required().label(labels.firstName),
    lastName: Yup.string().required().label(labels.lastName),
    password: Yup.string().required().label(labels.password),
    userRole: Yup.string().required().label(labels.userRole)
  })

  const methods = useHookForm<TypeSignUp>({
    initialState,
    schema
  });

  const onSubmit = async () => {
    try {
      const data = methods.getValues();
      console.log({ data });

      // const response = createUser(data);
      const response = await axios.post("http://localhost:3000/api/sign-up", data);

      console.log({ response });

      // if (response.success && response.message) {
      //   window.alert(response.message);

      //   navigate("/login");
      // } else {
      //   window.alert(response.message);
      // }

    } catch (error) {

    }
  };

  return (
    <div className="tw:flex">
      <div className='tw:w-full tw:md:w-1/2 tw:flex tw:flex-col tw:justify-center tw:items-center tw:p-8 tw:md:p-12'>
        <Form
          methods={methods}
          onSubmit={onSubmit}
          className="tw:max-w-md tw:p-8 tw:rounded-lg tw:border-gray-500 tw:shadow-sm"
        >
          <div className="tw:flex tw:justify-center tw:mb-6">
            <h2 className="tw:text-xl tw:font-medium">Rabbit</h2>
          </div>
          <h2 className="tw:text-2xl tw:text-center tw:font-bold tw:mb-6">Hey there! </h2>
          {/* <p className="tw:text-center tw:mb-6">Enter your email and password to login</p> */}

          <div className="row">
            <div className="col-12">
              <Input
                name={names.firstName}
                label={labels.firstName}
                required
              />
            </div>
            <div className="col-12">
              <Input
                name={names.lastName}
                label={labels.lastName}
                required
              />
            </div>
            <div className="col-12">
              <Input
                name={names.email}
                label={labels.email}
                type='email'
                required
              />
            </div>
            <div className="col-12">
              <Input
                name={names.password}
                label={labels.password}
                type='password'
                required
              />
            </div>
            <div className="col-12">
              <Select
                name={names.userRole}
                label={labels.userRole}
                options={roles}
                required
              />
            </div>
          </div>

          <SubmitButton
            label="Sign Up"
            variant="contained"
            className="tw:w-full tw:!mt-[20px]"
          />

          <p className="tw:text-center tw:mt-6 tw:text-sm">
            Back to login? {""}
            <Link to="/login" className="tw:text-blue-500">Sign In</Link>
          </p>
        </Form>
      </div>

      <div className="tw:hidden tw:md:block tw:w-1/2 tw:bg-gray-800">
        <div className="tw:h-full tw:flex tw:flex-col tw:justify-center tw:items-center">
          <img
            src="/images/register.webp"
            className="tw:w-full tw:h-[750px] tw:object-cover"
            alt="Login to account" />
        </div>
      </div>
    </div>
  );
};

export default SignUp as ComponentType;

