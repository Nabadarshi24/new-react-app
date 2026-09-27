import { ComponentType, ReactNode, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAccountStore } from '../stores/GlobalStore';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import Sidebar from '../admin/pages/Sidebar';

type TypeProps = {
  children?: ReactNode;
  role?: string;
};

const Private = ({ children, role }: TypeProps) => {

  const navigate = useNavigate();

  const isSignIn = useAccountStore(stroe => stroe?.state?.isSignIn);
  // const setIsSignIn = useAccountStore(stroe => stroe?.setIsSignIn);

  // const handleLogout = () => {

  //   localStorage.removeItem("loggedUser");
  //   setIsSignIn(false);
  //   navigate("/login");
  // };

  useEffect(() => {

    if (isSignIn && (role === 'admin' || role === 'super_admin')) {
      navigate("/admin/dashboard");
    }

    if (!isSignIn) {
      console.log("yy")
      navigate("/login");
    }
  }, [isSignIn, role]);

  return (
    // <div className="sidebar-with-content">
    role !== 'super_admin'
      ? <div className="tw:container tw:mx-auto tw:px-4 tw:py-4 content private-content">
        <Outlet />
        {/* {children} */}
      </div>
      : <div className="tw:flex tw:min-h-screen tw:bg-slate-50">
        <Sidebar />
        <main className="tw:flex-1 tw:overflow-y-auto tw:px-10 tw:py-8">
          <Outlet />
        </main>
      </div>
    // </div>
  )
};

export default Private as ComponentType<TypeProps>;
