import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAccountStore } from '../../stores/GlobalStore';
import { verifyOtp } from '../api';
import { FormProvider, useForm } from 'react-hook-form';
import { TypeSignInOtpPayload } from '../types';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from '@mui/material';
import { Input } from '../../form/Input';

export const VerifyOtp = () => {

  const navigate = useNavigate();

  const displayInstructions = localStorage.getItem("displayInstructions");
  const authKey = localStorage.getItem("authKey");
  // console.log({ authKey });

  const initialState: TypeSignInOtpPayload = {
    authKey: authKey,
    password: ""
  };

  const schema = yup.object<TypeSignInOtpPayload>().shape({
    authKey: yup.string().required().label("Auth key"),
    password: yup.string().required().label("Password")
  });

  const methods = useForm<TypeSignInOtpPayload>({
    defaultValues: initialState,
    resolver: yupResolver(schema)
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
    <>
      <div className="tw-text-black tw-text-18px tw-pt-10px">Two Factor Authentication</div>
      <div>{displayInstructions}</div>
      <div className='login-container'>
        <FormProvider {...methods}>
          <form
            className='login-form'
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="col-12">
                <Input
                  name="passwor"
                  label="OTP"
                />
              </div>
            </div>

            <button type="submit">Login</button>
          </form>
        </FormProvider>
      </div>
    </>
  )
};
