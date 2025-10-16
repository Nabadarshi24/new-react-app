import { useState } from 'react';
import { useAccountStore } from '../stores/GlobalStore';
import { Link, useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ArrowDropDown } from '@mui/icons-material';


export const Header = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const setIsSignIn = useAccountStore(stroe => stroe?.setIsSignIn);
  const userLabel = JSON.parse(localStorage.getItem("loggedUser") || "").userLabel;

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {

    localStorage.removeItem("loggedUser");
    setIsSignIn(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <h1>Header Logo</h1>

      <div className="header-menu">
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
          // hideBackdrop={true}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
          disableScrollLock={true}
          disablePortal={true}
        // PopoverProps={{
        //   // Prevent full-screen overlay
        //   disableScrollLock: true,
        //   PaperProps: {
        //     style: {
        //       pointerEvents: 'auto', // Make sure it's interactable
        //     },
        //   },
        //   // Optional: disable backdrop portal effects
        //   disablePortal: true,
        // }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/account/profile">Profile</Link>
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};
