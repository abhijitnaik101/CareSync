import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import PatientHistory from '../pages/Patient/PatientHistory';
import PatientProfile from '../pages/Patient/PatientProfile';
import Map from '../pages/Patient/Map';
import PatientNotification from '../pages/Patient/PatientNotification';

const PatientLayout: React.FC = () => {
  const patientLinks = [
    { name: 'Map', path: '/patient/map' },
    { name: 'Medical History', path: '/patient/medical-history' },
    { name: 'Profile', path: '/patient/profile' },
    { name: 'Notification', path: '/patient/notification' },
  ];

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
