import { useState } from 'react';
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

export const Login = () => {

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
    <div className="public-card">
      <div className='login-container'>
        <h1>Login Form</h1>

        <Form
          methods={methods}
          onSubmit={onSubmit}
        >
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
          />
        </Form>

        <div className="card-footer">
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </div>
    </div>
  )
};
