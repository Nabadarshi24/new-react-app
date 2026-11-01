import {
  useEffect,
  useState
} from "react";
import {
  Outlet,
  useLocation,
  useNavigate
} from "react-router";
import Sidebar from "../admin/pages/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { showErrorMessage } from "../helper/Helper";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = localStorage.getItem("role");
  const from = location.state?.from || "/";

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (role !== "super_admin") {
      showErrorMessage("You don't have permission to access this page.");
      navigate(from, { replace: true });
    }
  }, [role, from, navigate]);

  if (role !== "super_admin") {
    return null;
  }

  return (
    <div className="admin-layout tw:flex tw:flex-col tw:md:flex-row tw:h-screen tw:overflow-hidden tw:relative">
      {/* Mobile Header with Clickable Menu Icon (Visible only in responsive mode) */}
      <div className="tw:flex tw:md:hidden tw:items-center tw:justify-between tw:bg-gray-900 tw:text-white tw:px-4 tw:py-3 tw:shadow-md tw:z-20">
        <div className="tw:flex tw:items-center tw:gap-2">
          <IconButton
            onClick={toggleSidebar}
            sx={{ color: "white" }}
            aria-label="Open Admin Sidebar"
          >
            <MenuIcon />
          </IconButton>
          <span className="tw:text-lg tw:font-semibold">Admin Dashboard</span>
        </div>
      </div>

      {/* Mobile Dark Overlay Backdrop */}
      {isSidebarOpen && (
        <div
          className="tw:fixed tw:inset-0 tw:bg-black/50 tw:z-20 tw:md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar (Slide-over drawer on mobile, static on desktop) */}
      <div
        className={`tw:fixed tw:md:static tw:top-0 tw:left-0 tw:h-full tw:z-30 tw:transition-transform tw:duration-300 tw:ease-in-out ${
          isSidebarOpen ? "tw:translate-x-0" : "tw:-translate-x-full"
        } tw:md:translate-x-0 tw:shrink-0`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <main className="tw:flex-1 tw:overflow-y-auto tw:bg-gray-50 tw:p-4 tw:md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;