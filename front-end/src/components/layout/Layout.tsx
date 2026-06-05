import { ComponentType, useEffect } from 'react';
import { useAccountStore } from '../stores/GlobalStore';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { Loading } from '../elements/Loading';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';

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
      <Toaster position="bottom-left" duration={2000} />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout as ComponentType;
