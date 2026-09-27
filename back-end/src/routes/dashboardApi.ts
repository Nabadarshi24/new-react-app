import axios from "axios";
import { DashboardStats } from "../types/dashboard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await axios.get<DashboardStats>(
    `${API_URL}/admin/dashboard`,
    { headers: authHeader() }
  );
  return data;
};
