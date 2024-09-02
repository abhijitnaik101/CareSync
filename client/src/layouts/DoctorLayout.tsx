import React from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import { Routes, Route } from "react-router-dom";
import DoctorProfile from "../pages/Doctor/DoctorProfile";
import DoctorNotification from "../pages/Doctor/DoctorNotification";
import DoctorAppointment from "../pages/Doctor/DoctorAppointment";

const DoctorLayout: React.FC = () => {
  const doctorLinks = [
    { name: "Appointment", path: "/doctor/appointment" },
    { name: "Notification", path: "/doctor/notification" },
    { name: "Profile", path: "/doctor/profile" },
  ];

  return (
    <div className="flex">
      <Sidebar links={doctorLinks} />

      <div className="flex-1 p-4 overflow-y-scroll h-screen">
        <Routes>
          <Route path="appointment" element={<DoctorAppointment />} />
          <Route path="notification" element={<DoctorNotification />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default DoctorLayout;
