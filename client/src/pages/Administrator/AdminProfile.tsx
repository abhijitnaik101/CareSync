import React from 'react';

interface ProfileProps {
  title: string;
}

const AdminProfile: React.FC<ProfileProps> = ({ title }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>Manage your profile settings here.</p>
    </div>
  );
};

export default AdminProfile;
