import { ReactNode, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAccountStore } from '../stores/GlobalStore';
import { Header } from '../common/Header';

type TypeProps = {
  children?: ReactNode;
};

export const Private = ({ children }: TypeProps) => {

  const navigate = useNavigate();

  const isSignIn = useAccountStore(stroe => stroe?.state?.isSignIn);
  // const setIsSignIn = useAccountStore(stroe => stroe?.setIsSignIn);

  // const handleLogout = () => {

  //   localStorage.removeItem("loggedUser");
  //   setIsSignIn(false);
  //   navigate("/login");
  // };

  useEffect(() => {

    if (!isSignIn) {
      console.log("yy")
      navigate("/login");
    }
  }, [isSignIn]);

  return (
    <>
      <Header />

      <div className="sidebar-with-content">
        <div className="content">
          <Outlet/>
          {children}
        </div>
      </div>
    </>
  )
};
