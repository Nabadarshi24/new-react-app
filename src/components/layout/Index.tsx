import React, { useEffect } from 'react';
import { useAccountStore } from '../stores/GlobalStore';
import { Private } from './Private';
import { Public } from './Public';
import { Outlet } from 'react-router';

export const Layout = () => {

  const isSignIn = useAccountStore(stroe => stroe?.state?.isSignIn);
  // console.log("aaaaa", { isSignIn })

  useEffect(() => {
    console.log("aaaaa", { isSignIn })
  }, [isSignIn])

  return (
    <>
      {/* {isSignIn ? <Private /> : <Public />} */}
      <Outlet />
    </>
  )
}
