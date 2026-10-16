import { ComponentType, ReactNode, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAccountStore } from '../stores/GlobalStore';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import Sidebar from '../admin/pages/Sidebar';

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
    if (
      isSignIn &&
      (role === 'admin' || role === 'super_admin')
      && location.pathname.startsWith("/admin")
    ) {
      navigate("/admin/dashboard");
    }

    if (!isSignIn) {
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
