import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../api';
import { useForm } from 'react-hook-form';
import { TypeLogin } from '../types';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form } from '../../form/Form';
import { Input } from '../../form/Input';
import { SubmitButton } from '../../form/SubmitButton';
import { titleCase } from 'text-case';
import { composeInitialState } from '../../utils/Helpers';

export const Login = () => {

  const navigate = useNavigate();

  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const [initialState, names, labels] = composeInitialState<TypeLogin>({
    userName: [undefined, "Username"],
    password: ""
  });

  const schema = yup.object<TypeLogin>().shape({
    userName: yup.string().required().label(labels.userName),
    password: yup.string().required().label(labels.password)
  })

  const methods = useForm<TypeLogin>({
    defaultValues: initialState,
    resolver: yupResolver(schema),
    mode:"onChange"
  });

  const onSubmit = async (data: TypeLogin) => {
    try {
      const response = await login(data);

      console.log({ response })
      if (response.success && response.data) {
        console.log("aa")
        // const data = response.data.data;
        if (response.data.isTwoFactorAuthRequired && response.data.isTwoFactorAuthEnabled) {
          console.log("bb")
          localStorage.setItem("displayInstructions", response.data.twoFactorAuthInstructions);
          localStorage.setItem("authKey", response.data.authData.tempAuthKey);

          // setIsSignIn(true);
          navigate("/verify-otp");
        }
      }
    } catch (error) {

    }
  };

  return (
    <div className='login-container'>
      <h1>Login Form</h1>
      <Form
        methods={methods}
        onSubmit={onSubmit}
      >
        <div className="row">
          <div className="col-12">
            <Input
              name={names.userName}
              label={labels.userName}
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
    </div>
  )
};
