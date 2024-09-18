import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import DoctorProfile from "../pages/Doctor/DoctorProfile";
import DoctorNotification from "../pages/Doctor/DoctorNotification";
import DoctorAppointment from "../pages/Doctor/DoctorAppointment";
import axios from "axios";
import { route } from "../../backendroute";

const DoctorLayout: React.FC = () => {
  const doctorLinks = [
    { name: "Appointment", path: "/doctor/appointment" },
    { name: "Notification", path: "/doctor/notification" },
    { name: "Profile", path: "/doctor/profile" },
  ];
  const navigate = useNavigate();

  const fetchDoctor = async (token: string) => {
    try {
      await axios.get(route + "/authenticate/doctor", {
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
    fetchDoctor(token);
  }, []);

  return (
    <div className="flex">
      <Sidebar links={doctorLinks} />

      <div className="flex-1 overflow-y-scroll h-screen">
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
