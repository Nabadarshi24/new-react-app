import { Link, NavLink, useNavigate } from "react-router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const sidebarItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon fontSize="small" /> },
    { name: "Users", path: "/admin/users", icon: <GroupIcon fontSize="small" /> },
    { name: "Products", path: "/admin/products", icon: <Inventory2Icon fontSize="small" /> },
    { name: "Orders", path: "/admin/orders", icon: <ListAltIcon fontSize="small" /> },
    { name: "Shop", path: "/", icon: <StorefrontIcon fontSize="small" /> },
  ];

  return (
    <div className="tw:bg-gray-900 tw:text-white tw:w-64 tw:h-full tw:p-6 tw:flex tw:flex-col tw:justify-between tw:relative">
      <div>
        {/* Cancel Icon (Only shows in responsive mode) */}
        <div className="tw:md:hidden tw:absolute tw:top-3 tw:right-3">
          <IconButton
            onClick={onClose}
            sx={{ color: "#9ca3af", "&:hover": { color: "white" } }}
            aria-label="Close Sidebar"
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Brand */}
        <div className="tw:mb-6">
          <Link
            to="/"
            onClick={onClose}
            className="tw:text-2xl tw:font-bold tw:text-white tw:no-underline"
          >
            Rabbit
          </Link>
        </div>

        {/* <Link
          to="/admin/dashboard"
          onClick={onClose}
          className="tw:no-underline tw:text-white"
        >
          <h2 className="tw:text-lg tw:font-semibold tw:mb-6 tw: hover:text-gray-300">
            Admin Dashboard
          </h2>
        </Link> */}

        {/* Navigation Links */}
        <nav className="tw:flex tw:flex-col tw:space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `${isActive
                  ? "tw:bg-gray-700 tw:text-white"
                  : "tw:text-gray-300 tw:hover:bg-gray-800 tw:hover:text-white"
                } tw:py-2.5 tw:px-4 tw:rounded tw:flex tw:items-center tw:gap-3 tw:no-underline tw:transition-colors`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="tw:mt-6">
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          sx={{ textTransform: "none", py: 1 }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;