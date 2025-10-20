// import React from 'react'
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router';

export const Navbar = () => {
  return (
    <div className="container mx-auto flex justify-between items-center py-4 px-4">
      <div>
        <Link to="/" className='text-2xl font-medium text-black'>
          {/* <img src="@/assets/images/nav_logo.png" alt="" /> */}
          Rabbit
        </Link>
      </div>

      <div className="hidden md:flex space-x-6">
        <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Men</Link>
        <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Women</Link>
        <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Top Wear</Link>
        <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Bottom Wear</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/profile" className="hover:text-black">
          <AccountCircle className='text-gray-700 h-6 w-6' />
        </Link>
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
