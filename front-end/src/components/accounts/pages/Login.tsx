import { ComponentType, useState } from 'react';
// import * as yup from "yup";
import * as Yup from "yup";
import {
  Link,
  useNavigate
} from 'react-router';
import { login } from '../api';
import { TypeLogin, TypeLoginUserData } from '../types';
import { Form } from '../../form/Form';
import { Input } from '../../form/Input';
import { SubmitButton } from '../../form/SubmitButton';
import { composeInitialState, loginUser } from '../../utils/Helpers';
import { useHookForm } from '../../libs/HookForm';
import { useAccountStore } from '../../stores/GlobalStore';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const setIsSignIn = useAccountStore(store => store?.setIsSignIn);

  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const { initialState, names, labels } = composeInitialState<TypeLogin>({
    email: "",
    password: ""
  });

  const schema = Yup.object<TypeLogin>().shape({
    email: Yup.string().email().required().label(labels.email),
    password: Yup.string().required().label(labels.password)
  })

  const methods = useHookForm<TypeLogin>({
    initialState,
    schema
  });

  const onSubmit = async (data: TypeLogin) => {
    try {
      const data = methods.getValues();

      // const response = await login(data);

      // const response = loginUser(data);

      const response = await axios.post("http://localhost:3000/api/sign-in", data);

      console.log({ response })
      // if (response.success && response.data) {
      //   const loggedUser: TypeLoginUserData = {
      //     userId: response.data.id,
      //     userLabel: response.data.firstName + " " + response.data.lastName,
      //     firstName: response.data.firstName,
      //     lastName: response.data.lastName,
      //     email: response.data.email,
      //     roleLabel: response.data.role,
      //     isVerified: response.data.isVerified,
      //     isDeleted: response.data.isDeleted
      //   };

      //   localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      //   setIsSignIn(true);
      //   navigate("/dashboard");
      //   window.alert(response.message);
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
          <p className="tw:text-center tw:mb-6">Enter your email and password to login</p>

          <div className="row">
            <div className="col-12">
              <Input
                name={names.email}
                label={labels.email}
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
          </div>

          <SubmitButton
            label="Login"
            variant="contained"
            className='tw:w-full'
          />

          <p className="tw:text-center tw:mt-6 tw:text-sm">
            Don't have an account? {""}
            <Link to="/sign-up" className="tw:text-blue-500">Sign Up</Link>
          </p>
        </Form>
      </div>

      <div className="tw:hidden tw:md:block tw:w-1/2 tw:bg-gray-800">
        <div className="tw:h-full tw:flex tw:flex-col tw:justify-center tw:items-center">
          <img
            src="/images/login.webp"
            className="tw:w-full tw:h-[750px] tw:object-cover"
            alt="Login to account" />
        </div>
      </div>
    </div>
  )
};

export default Login as ComponentType;

