import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../api';
import { useForm } from 'react-hook-form';
import { TypeLogin } from '../types';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const Login = () => {

  const navigate = useNavigate();

  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const schema = yup.object<TypeLogin>().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TypeLogin>({
    defaultValues: {
      username: "",
      password: ""
    },
    resolver: yupResolver(schema)
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
      <form
        className='login-form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-12">
            <label><b>Username</b></label>
            <input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: true })}
            // onChange={(e) => setUserName(e.target.value)}
            />
            {
              errors.username?.message &&
              <p className='color-error'>{errors.username?.message}</p>
            }
          </div>
          <div className="col-12">
            <label><b>Password</b></label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            // onChange={(e) => setPassword(e.target.value)}
            />
            {
              errors.password?.message &&
              <p className='color-error'>{errors.password?.message}</p>
            }
          </div>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
};
