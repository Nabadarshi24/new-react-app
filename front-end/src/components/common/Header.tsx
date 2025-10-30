import { useState } from 'react';
import { useAccountStore } from '../stores/GlobalStore';
import { Link, useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ArrowDropDown } from '@mui/icons-material';
import { Topbar } from './Topbar';
import { Navbar } from './Navbar';


export const Header = () => {

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);

  // const navigate = useNavigate();

  // const setIsSignIn = useAccountStore(stroe => stroe?.setIsSignIn);
  // const userLabel = JSON.parse(localStorage.getItem("loggedUser") || "").userLabel;

  // const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleLogout = () => {

  //   localStorage.removeItem("loggedUser");
  //   setIsSignIn(false);
  //   navigate("/login");
  // };

  return (
    <div className="tw:border-b tw:bg-white tw:border-gray-200 tw:fixed tw:top-0 tw:left-0 tw:right-0 tw:z-50">
      <Topbar />
      <Navbar />
    </div>
  );
};
