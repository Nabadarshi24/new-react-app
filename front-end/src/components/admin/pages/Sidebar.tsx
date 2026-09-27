import { NavLink } from "react-router";
import {
  Assignment,
  Group,
  ShoppingBag,
  Store,
} from "@mui/icons-material";

const navItems = [
  { label: "Users", icon: Group, to: "/admin/users" },
  { label: "Products", icon: ShoppingBag, to: "/admin/products" },
  { label: "Orders", icon: Assignment, to: "/admin/orders" },
  { label: "Shop", icon: Store, to: "/admin/shop" },
];

const linkBaseClasses =
  "tw:flex tw:items-center tw:gap-3 tw:rounded-lg tw:px-3 tw:py-2 tw:text-sm tw:font-medium tw:transition-colors";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="tw:flex tw:min-h-screen tw:w-60 tw:flex-col tw:justify-between tw:bg-slate-900 tw:px-4 tw:py-6">
      <div>
        <h1 className="tw:mb-8 tw:px-2 tw:text-xl tw:font-bold tw:text-white">Rabbit</h1>

        <nav className="tw:flex tw:flex-col tw:gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `${linkBaseClasses} ${
                    isActive
                      ? "tw:bg-slate-800 tw:text-white"
                      : "tw:text-slate-300 tw:hover:bg-slate-800 tw:hover:text-white"
                  }`
                }
              >
                <Icon fontSize="small" /> {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-lg tw:bg-red-500 tw:px-3 tw:py-2.5 tw:text-sm tw:font-semibold tw:text-white tw:transition-colors tw:hover:bg-red-600"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;