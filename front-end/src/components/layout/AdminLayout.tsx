import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import Sidebar from "../admin/pages/Sidebar";
import { showErrorMessage } from "../helper/Helper";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const from = location.state?.from || "/";

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
    <div className="admin-layout tw:flex tw:h-screen tw:overflow-hidden">
      <Sidebar />

      {/* <main> */}
      <Outlet />
      {/* </main> */}
    </div>
  );
};

export default AdminLayout;