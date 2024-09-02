import React from 'react';

interface OPDProps {
  title: string;
}

const AdminOPD: React.FC<OPDProps> = ({ title }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>Manage Outpatient Department operations here.</p>
    </div>
  );
};

export default AdminOPD;
