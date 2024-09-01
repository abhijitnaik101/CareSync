import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import PatientHistory from '../pages/Patient/PatientHistory';
import PatientProfile from '../pages/Patient/PatientProfile';

const PatientLayout: React.FC = () => {
  const patientLinks = [
    { name: 'Map', path: '/patient/map' },
    { name: 'Medical History', path: '/patient/medical-history' },
    { name: 'Profile', path: '/patient/profile' },
  ];

  return (
    <div className="flex">
      <Sidebar links={patientLinks} />
      <Routes>
        <Route path="map" element={<Dashboard title="Patient Profile" />} />
        <Route path="medical-history" element={<PatientHistory/>} />
        <Route path="profile" element={<PatientProfile/>} />
      </Routes>
    </div>
  );
};

export default PatientLayout;
