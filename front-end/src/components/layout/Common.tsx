// import React from 'react'
import { ReactNode } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';

type TypeProps = {
  children?: ReactNode;
};

export const Common = ({ children }: TypeProps) => {
  return (
    <div className="content common-content">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
