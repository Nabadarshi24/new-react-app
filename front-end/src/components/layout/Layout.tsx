import { ComponentType, useEffect } from 'react';
import { useAccountStore } from '../stores/GlobalStore';
import { Outlet, useLocation, useParams } from 'react-router';
import { Toaster } from 'sonner';
import { Loading } from '../elements/Loading';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';

type TypeProps = {
  role: string;
};

const Layout = () => {

  const location = useLocation();

  const isSignIn = useAccountStore(stroe => stroe?.state?.isSignIn);
  const isLoading = useAccountStore(stroe => stroe?.state?.isLoading);
  // console.log("aaaaa", { isSignIn })

  const role = localStorage.getItem('role');

  useEffect(() => {
    // console.log("aaaaa", { isSignIn })
  }, [isSignIn])

  console.log("current path", location.pathname);
  console.log({role})

  return (
    <>
      {/* {isSignIn ? <Private /> : <Public />} */}
      {isLoading && <Loading />}
      <Toaster position="bottom-left" duration={2000} />
      {
        (
          role !== 'super_admin' ||
          (role === 'super_admin' && !location.pathname.startsWith("/admin"))
        ) &&
        <Header />
      }
      <Outlet />
      {
        (
          role !== 'super_admin' ||
          (role === 'super_admin' && !location.pathname.startsWith("/admin"))
        ) &&
        <Footer />
      }
    </>
  );
};

export default Layout as ComponentType;
