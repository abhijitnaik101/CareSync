import React from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { Routes, Route } from 'react-router-dom';
import ReceptionistRegistration from '../pages/Receptionist/ReceptionistRegistration';

const ReceptionistLayout: React.FC = () => {

  const initialRegistrations = [
    {
      name: "Saswat Kumar Dash",
      date: "10/10/2024",
      gender: "female",
      register: "10:30 a.m.",
      visit: "10:30 a.m.",
    },
    // Other entries...
  ];

  const receptionistLinks = [
    { name: 'Dashboard', path: '/receptionist/dashboard' },
  ];

  return (
    <div className="flex ">
      <Sidebar links={receptionistLinks} />
      <div className='w-full overflow-y-scroll h-screen pt-10 sm:pt-0 bg-gray-900'>
        <Routes>
          <Route path="dashboard" element={<ReceptionistRegistration registrations={initialRegistrations} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ReceptionistLayout;
