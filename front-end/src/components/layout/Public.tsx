import { ReactNode, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAccountStore } from '../stores/GlobalStore';
import { Header } from '../common/Header';

type TypeProps = {
  children?: ReactNode;
};

export const Public = ({ children }: TypeProps) => {

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
      <Header />
      <div className="content">
        <Outlet />
        {children}
      </div>
      {/* <Footer /> */}
    </>
  )
};
