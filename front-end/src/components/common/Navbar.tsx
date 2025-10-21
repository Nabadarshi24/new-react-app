// import React from 'react'
import {
  AccountCircleOutlined,
  MenuOutlined,
  ShoppingBagOutlined
} from '@mui/icons-material';
import { Link } from 'react-router';
import { SearchBar } from './parts/SearchBar';

export const Navbar = () => {
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
        <button className="tw:relative tw:hover:text-black">
          <ShoppingBagOutlined className='tw:text-gray-700 tw:h-6 tw:w-6' />
          <span className="tw:absolute tw:-top-1px tw:-right-14px tw:bg-[#ea2e0e] tw:text-white tw:text-xs tw:rounded-full tw:px-2 tw:py-0.5">4</span>
        </button>
        <SearchBar />
        <div className="tw:md:hidden">
          <MenuOutlined className="tw:text-gray-700 tw:h-6 tw:w-6" />
        </div>
      </div>

      {/* <div className="header-menu">
        <span
          id="basic-button"
          className="header-menu-btn"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleToggle}
        >
          <span>{userLabel}</span>
          <ArrowDropDown className={`${open ? 'rotate-icon' : ''}`} />
        </span>

        <Menu
          id="basic-menu"
          className='header-menu-items'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          autoFocus={false}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
          disableScrollLock={true}
          disablePortal={true}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/account/profile">Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div> */}
    </div>
  );
};
