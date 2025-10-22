// import React from 'react'
import {
  AccountCircleOutlined,
  Close,
  MenuOutlined,
  ShoppingBagOutlined
} from '@mui/icons-material';
import { Link } from 'react-router';
import { SearchBar } from './parts/SearchBar';
import { CartDrawer } from '../cart/pages/CartDrawer';
import { useState } from 'react';

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleToggleNavDrawer = () => {
    setIsNavDrawerOpen(!isNavDrawerOpen);
  };

  return (
    <div className="tw:container tw:mx-auto tw:flex tw:justify-between tw:items-center tw:py-4 tw:px-4">
      <div>
        <Link to="/" className='tw:text-2xl tw:font-medium tw:text-black'>
          {/* <img src="/images/nav_logo.png" alt="" /> */}
          Rabbit
        </Link>
      </div>

      <div className="tw:hidden tw:md:flex tw:space-x-6">
        <Link to="#" className="tw:text-gray-700 tw:hover:text-black tw:text-sm tw:font-medium tw:uppercase">Men</Link>
        <Link to="#" className="tw:text-gray-700 tw:hover:text-black tw:text-sm tw:font-medium tw:uppercase">Women</Link>
        <Link to="#" className="tw:text-gray-700 tw:hover:text-black tw:text-sm tw:font-medium tw:uppercase">Top Wear</Link>
        <Link to="#" className="tw:text-gray-700 tw:hover:text-black tw:text-sm tw:font-medium tw:uppercase">Bottom Wear</Link>
      </div>

      <div className="tw:flex tw:items-center tw:justify-between tw:gap-4">
        <Link to="/profile" className="tw:hover:text-black">
          <AccountCircleOutlined className='tw:text-gray-700 tw:h-6 tw:w-6' />
        </Link>
        <button
          onClick={handleDrawerToggle}
          className="tw:relative tw:cursor-pointer tw:hover:text-black"
        >
          <ShoppingBagOutlined className='tw:text-gray-700 tw:h-6 tw:w-6' />
          <span className="tw:absolute tw:-top-1px tw:-right-14px tw:bg-[#ea2e0e] tw:text-white tw:text-xs tw:rounded-full tw:px-2 tw:py-0.5">4</span>
        </button>

        <SearchBar />

        <button
          onClick={handleToggleNavDrawer}
          className="tw:md:hidden tw:cursor-pointer"
        >
          <MenuOutlined className="tw:text-gray-700 tw:h-6 tw:w-6" />
        </button>
      </div>

      <CartDrawer isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Mobile Navigation */}

      <div className={`tw:fixed tw:top-0 tw:left-0 tw:w-3/4 tw:sm:w-1/2 tw:md:w-1/3 tw:h-full tw:bg-white tw:shadow-lg tw:transform tw:transition-transform tw:duration-300 tw:z-50 ${isNavDrawerOpen ? "tw:translate-x-0" : "tw:-translate-x-full"}`}>
        <div className="tw:flex tw:justify-end tw:p-4">
          <button
            className='tw:cursor-pointer'
            onClick={handleToggleNavDrawer}
          >
            <Close className='tw:text-gray-600' />
          </button>
        </div>
      </div>
    </div>
  );
};
