import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ReceptionistRegistration from '../pages/Receptionist/ReceptionistRegistration';
import axios from 'axios';
import { route } from '../../backendroute';

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
  const navigate = useNavigate();

  const fetchReceptionist = async (token: string) => {
    try {
      await axios.get(route + "/authenticate/receptionist", {
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
    fetchReceptionist(token);
  }, []);

  return (
    <div className="flex">
      <Sidebar links={receptionistLinks} />
      <Routes>
        <Route path="dashboard" element={<ReceptionistRegistration initialRegistrations={initialRegistrations}/>} />
      </Routes>
    </div>
  );
};

export default ReceptionistLayout;
