import { ComponentType, useEffect } from 'react';
import { useAccountStore } from '../stores/GlobalStore';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { Loading } from '../elements/Loading';

const Layout = () => {

  const isSignIn = useAccountStore(stroe => stroe?.state?.isSignIn);
  const isLoading = useAccountStore(stroe => stroe?.state?.isLoading);
  // console.log("aaaaa", { isSignIn })

  useEffect(() => {
    // console.log("aaaaa", { isSignIn })
  }, [isSignIn])

  return (
    <>
      {/* {isSignIn ? <Private /> : <Public />} */}
      {isLoading && <Loading />}
      <Toaster position="top-right" duration={2000} />
      <Outlet />
    </>
  );
};

export default Layout as ComponentType;
