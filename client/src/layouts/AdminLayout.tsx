import React from 'react';
import Sidebar from '../components/Sidebar';

import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/Administrator/AdminDashboard';
import AdminWard from '../pages/Administrator/AdminWard';
import AdminOPD from '../pages/Administrator/AdminOPD';
import AdminNotifications from '../pages/Administrator/AdminNotifications';
import AdminProfile from '../pages/Administrator/AdminProfile';

const AdminLayout: React.FC = () => {
  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Ward', path: '/admin/ward' },
    { name: 'OPD', path: '/admin/opd' },
    { name: 'Notification', path: '/admin/notification' },
    { name: 'Profile', path: '/admin/profile' },
  ];


  const patientDummy = [
    {
      name: "John Doe",
      bed: 101,
      gender: "Male",
      status: "Stable",
    },
    {
      name: "Jane Smith",
      bed: 202,
      gender: "Female",
      status: "Critical",
    },
    {
      name: "Robert Johnson",
      bed: 303,
      gender: "Male",
      status: "Recovering",
    },
  ];

  return (
    <div className="flex">
      <Sidebar links={adminLinks} />
      <Routes>
        <Route path="dashboard" element={<AdminDashboard title="Admin Dashboard" />} />
        <Route path="ward" element={<AdminWard patients={patientDummy}/>} />
        <Route path="opd" element={<AdminOPD title="OPD Management" />} />
        <Route path="notification" element={<AdminNotifications title="Notification" />} />
        <Route path="profile" element={<AdminProfile title="Profile" />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
