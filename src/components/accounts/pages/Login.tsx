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

export const Login = () => {

  const navigate = useNavigate();

  const setIsSignIn = useAccountStore(store => store?.setIsSignIn);

  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const { initialState, names, labels } = composeInitialState<TypeLogin>({
    userName: ["", "Username"],
    password: ""
  });

  const schema = Yup.object<TypeLogin>().shape({
    userName: Yup.string().required().label(labels.userName),
    password: Yup.string().required().label(labels.password)
  })

  const methods = useHookForm<TypeLogin>({
    initialState,
    schema
  });

  const onSubmit = async (data: TypeLogin) => {
    try {
      // const response = await login(data);

      const response = loginUser(data);

      console.log({ response })
      if (response.success && response.data) {
        const loggedUser: TypeLoginUserData = {
          userId: response.data.id,
          userLabel: response.data.firstName + " " + response.data.lastName,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          roleLabel: response.data.role,
          isVerified: response.data.isVerified,
          isDeleted: response.data.isDeleted
        };

        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        setIsSignIn(true);
        navigate("/dashboard");
        window.alert(response.message);
      } else {
        window.alert(response.message);
      }

      // if (response.success && response.data) {
      //   console.log("aa")
      //   // const data = response.data.data;
      //   if (response.data.isTwoFactorAuthRequired && response.data.isTwoFactorAuthEnabled) {
      //     console.log("bb")
      //     localStorage.setItem("displayInstructions", response.data.twoFactorAuthInstructions);
      //     localStorage.setItem("authKey", response.data.authData.tempAuthKey);

      //     // setIsSignIn(true);
      //     navigate("/verify-otp");
      //   }
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

        <div className="card-footer">
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </div>
    </div>
  )
};
