import React, { Children, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAccountStore } from '../stores/GlobalStore';

export const Public = ({ children }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const isSignIn = useAccountStore(stroe => stroe?.state?.isSignIn);

  useEffect(() => {

    if (isSignIn) {
      console.log("yy")
      navigate("/dashboard");
    } else if (location.pathname == "/verify-otp") {
      navigate("/login");
    }
  }, [isSignIn])

  return (
    <>
      <div className="content">
        {children}
      </div>
    </>
  )
};
