import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";

import { Routes, Route, useNavigate } from "react-router-dom";
import AdminDashboard from "../pages/Administrator/AdminDashboard";
import AdminWard from "../pages/Administrator/AdminWard";
import AdminOPD from "../pages/Administrator/AdminOPD";
import AdminNotifications from "../pages/Administrator/AdminNotifications";
import AdminProfile from "../pages/Administrator/AdminProfile";
import axios from "axios";
import { route } from "../../backendroute";

const AdminLayout: React.FC = () => {
  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Ward", path: "/admin/ward" },
    { name: "OPD", path: "/admin/opd" },
    { name: "Notification", path: "/admin/notification" },
    { name: "Profile", path: "/admin/profile" },
  ];

  const navigate = useNavigate();

  const fetchAdmin = async (token: string) => {
    try {
      await axios.get(route + "/authenticate/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else
    fetchAdmin(token);
  }, []);

  return (
    <div className="flex ">
      <Sidebar links={adminLinks} />
      <div className="flex-1 p-4 overflow-y-scroll h-screen">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />}/>
          <Route path="ward" element={<AdminWard />} />
          <Route path="opd" element={<AdminOPD />} />
          <Route path="notification" element={<AdminNotifications />}/>
          <Route path="profile" element={<AdminProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
