// import React from 'react'
import { ReactNode } from 'react';
import { Outlet } from 'react-router';

type TypeProps = {
  children?: ReactNode;
};

export const Common = ({ children }: TypeProps) => {
  return (
    <div className="content common-content">
      <Outlet />
      {/* {children} */}
    </div>
  );
};
