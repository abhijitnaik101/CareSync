import React from 'react';

interface NotificationProps {
  title: string;
}

const AdminNotifications: React.FC<NotificationProps> = ({ title }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>View and manage notifications here.</p>
    </div>
  );
};

export default AdminNotifications;
