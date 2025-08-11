import { ReactNode, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAccountStore } from '../stores/GlobalStore';

type TypeProps = {
  children: ReactNode;
};

export const Private = ({ children }: TypeProps) => {

  const navigate = useNavigate();

  const isSignIn = useAccountStore(stroe => stroe?.state?.isSignIn);
  const setIsSignIn = useAccountStore(stroe => stroe?.setIsSignIn);

  const handleLogout = () => {

    localStorage.clear();
    setIsSignIn(false);
    navigate("/login");
  };

  useEffect(() => {

    if (!isSignIn) {
      console.log("yy")
      navigate("/login");
    }
  }, [isSignIn]);

  return (
    <>
      <div className="header">
        <h1>Header</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="sidebar-with-content">
        <div className="content">
          {children}
        </div>
      </div>
    </>
  )
};
