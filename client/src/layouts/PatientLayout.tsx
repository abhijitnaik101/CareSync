import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PatientHistory from '../pages/Patient/PatientHistory';
import PatientProfile from '../pages/Patient/PatientProfile';
import Map from '../pages/Patient/Map';
import PatientNotification from '../pages/Patient/PatientNotification';
import axios from 'axios';
import { route } from '../../backendroute';

const PatientLayout: React.FC = () => {
  const patientLinks = [
    { name: 'Map', path: '/patient/map' },
    { name: 'Medical History', path: '/patient/medical-history' },
    { name: 'Profile', path: '/patient/profile' },
    { name: 'Notification', path: '/patient/notification' },
  ];
  const navigate = useNavigate();

  const fetchPatient = async (token: string) => {
    try {
      await axios.get(route + "/authenticate/patient", {
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
    fetchPatient(token);
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar links={patientLinks} />
      <div className='w-full overflow-y-scroll h-screen'>
      <Routes>
        <Route path="map" element={<Map/>} />
        <Route path="medical-history" element={<PatientHistory/>} />
        <Route path="profile" element={<PatientProfile/>} />
        <Route path="notification" element={<PatientNotification/>} />
      </Routes>
      </div>
    </div>
  );
};

export default PatientLayout;
