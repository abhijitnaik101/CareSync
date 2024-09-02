import React from 'react';

interface DashboardProps {
  title: string;
}

const AdminDashboard: React.FC<DashboardProps> = ({ title }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>Welcome to the {title}</p>
    </div>
  );
};

export default AdminDashboard;
