import { ComponentType, ReactNode, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAccountStore } from '../stores/GlobalStore';

type TypeProps = {
  children?: ReactNode;
  role?: string;
};

const Private = ({ children }: TypeProps) => {

  const navigate = useNavigate();
  const location = useLocation();

  const isSignIn = useAccountStore(stroe => stroe?.state?.isSignIn);

  const role = localStorage.getItem('role');

  // const handleLogout = () => {

  //   localStorage.removeItem("loggedUser");
  //   setIsSignIn(false);
  //   navigate("/login");
  // };

  useEffect(() => {
    if (isSignIn) {
      if (role === 'admin' || role === 'super_admin') {
        navigate(location.pathname);
      }
    } else {
      navigate("/login");
    }
  }, [isSignIn, role]);

  return (
    <div className="private-content">
      <Outlet />
    </div>
  )
};

export default Private as ComponentType<TypeProps>;
