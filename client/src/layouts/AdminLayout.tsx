import React from "react";
import Sidebar from "../components/Sidebar";

import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Administrator/AdminDashboard";
import AdminWard from "../pages/Administrator/AdminWard";
import AdminOPD from "../pages/Administrator/AdminOPD";
import AdminNotifications from "../pages/Administrator/AdminNotifications";
import AdminProfile from "../pages/Administrator/AdminProfile";
import AdminQueue from "../pages/Administrator/AdminQueue";

const AdminLayout: React.FC = () => {
  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Ward", path: "/admin/ward" },
    { name: "OPD", path: "/admin/opd" },
    { name: "Notification", path: "/admin/notification" },
    { name: "Profile", path: "/admin/profile" },
  ];

  const patientDummy = [
    {
      name: "John Doe",
      bed: 101,
      gender: "Male",
      status: "Available",
    },
    {
      name: "Jane Smith",
      bed: 202,
      gender: "Female",
      status: "Occupied",
    },
    {
      name: "Robert Johnson",
      bed: 303,
      gender: "Male",
      status: "Available",
    },
  ];

  return (
    <div className="flex ">
      <Sidebar links={adminLinks} />
      <div className="flex-1 overflow-y-scroll h-screen pt-10 sm:pt-0 bg-gray-900">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard title="Admin Dashboard" />}/>
          <Route path="ward" element={<AdminWard patients={patientDummy} />} />
          <Route path="opd" element={<AdminQueue/>} />
          <Route path="notification" element={<AdminNotifications title="Notification" />}/>
          <Route path="profile" element={<AdminProfile title="Profile" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
