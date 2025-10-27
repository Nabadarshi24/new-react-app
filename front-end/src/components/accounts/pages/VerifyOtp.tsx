import { ComponentType, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAccountStore } from '../../stores/GlobalStore';
import { verifyOtp } from '../api';
import { FormProvider, useForm } from 'react-hook-form';
import { TypeLogin, TypeSignInOtpPayload } from '../types';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField } from '@mui/material';
import { Input } from '../../form/Input';
import { Form } from '../../form/Form';
import { composeInitialState } from '../../utils/Helpers';
import { useHookForm } from '../../libs/HookForm';

const VerifyOtp = () => {

  const navigate = useNavigate();

  const displayInstructions = localStorage.getItem("displayInstructions");
  const authKey = localStorage.getItem("authKey");
  // console.log({ authKey });

  // const initialState: TypeSignInOtpPayload = {
  //   authKey: authKey,
  //   password: ""
  // };

  const { initialState, names, labels } = composeInitialState<TypeSignInOtpPayload>({
    authKey: authKey,
    password: ["", "OTP"]
  });

  const schema = Yup.object<TypeSignInOtpPayload>().shape({
    authKey: Yup.string().required().label(labels.authKey),
    password: Yup.string().required().label(labels.password)
  });

  const methods = useHookForm<TypeSignInOtpPayload>({
    initialState,
    schema
  })

  const setIsSignIn = useAccountStore(store => store?.setIsSignIn);

  // const [value, setValue] = useState("");

  const onSubmit = async (data: TypeSignInOtpPayload) => {
    try {

      const response = await verifyOtp(data);

      console.log({ response })

      if (response.success && response.data) {
        console.log("dd")
        localStorage.setItem("accessToken", response.data.authData.accessToken);
        localStorage.setItem("refreshToken", response.data.authData.refreshToken);
        localStorage.setItem("userId", response.data.authData.userId);
        localStorage.setItem("userLabel", response.data.authData.userLabel);
        localStorage.setItem("roleId", response.data.authData.roleId);

        setIsSignIn(true);
        navigate("/dashboard");
      }

    } catch (error) {

    }
  };

  return (
    <div className="public-card">
      <div className='login-container'>
        <div className="tw-text-black tw-text-18px tw-pt-10px">Two Factor Authentication</div>
        <div>{displayInstructions}</div>

        <Form
          methods={methods}
          onSubmit={onSubmit}
        >
          <div className="row">
            <div className="col-12">
              <Input
                name={names.password}
                label={labels.password}
                required
              // type='password'
              />
            </div>
          </div>

          <button type="submit">Login</button>
        </Form>
      </div>
    </div>
  )
};

export default VerifyOtp as ComponentType;

