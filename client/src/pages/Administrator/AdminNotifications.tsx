// AdminNotification.tsx
import React from 'react';

const AdminNotification: React.FC = () => {
  // Dummy notifications
  const notifications = [
    { id: 1, message: 'Patient John Doe has been successfully admitted to Room 301.' },
    { id: 2, message: 'New policy updates have been applied to the hospital management system.' },
    { id: 3, message: 'Dr. Smith has requested a new set of medical supplies for the ICU.' },
    { id: 4, message: 'The hospital’s weekly staff meeting has been rescheduled to 3 PM on Monday.' },
    { id: 5, message: 'A new patient record for Mary Johnson has been added to the system.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className=" mx-auto bg-white rounded-lg shadow-xl">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        </div>
        <div className="p-6 space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <p className="text-gray-700">{notification.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
