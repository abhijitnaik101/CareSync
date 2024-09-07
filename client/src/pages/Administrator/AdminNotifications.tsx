import React, { useState } from 'react';

interface Notification {
  id: number;
  message: string;
  category: string;
}

const AdminNotification: React.FC = () => {
  // Dummy notifications with categories
  const notifications: Notification[] = [
    { id: 1, message: 'Patient John Doe has been successfully admitted to Room 301.', category: 'Admissions' },
    { id: 2, message: 'New policy updates have been applied to the hospital management system.', category: 'System Updates' },
    { id: 3, message: 'Dr. Smith has requested a new set of medical supplies for the ICU.', category: 'Inventory Management' },
    { id: 4, message: 'The hospital’s weekly staff meeting has been rescheduled to 3 PM on Monday.', category: 'Meetings' },
    { id: 5, message: 'A new patient record for Mary Johnson has been added to the system.', category: 'Patient Records' },
  ];

  //Function to group notifications by category
  const groupByCategory = (data: Notification[]) => {
    const categories = data.reduce((acc, notification) => {
      acc[notification.category] = (acc[notification.category] || []).concat(notification);
      return acc;
    }, {} as Record<string, Notification[]>);
    return categories;
  };

  // State to manage the currently selected category
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Function to filter notifications by category
  const filteredNotifications = () => {
    if (selectedCategory === 'All') {
      return notifications;
    } else {
      return notifications.filter((notification) => notification.category === selectedCategory);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto bg-white rounded-lg shadow-xl">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <div className="mt-4 flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 transition`}
              onClick={() => handleCategoryChange('All')}
            >
              All
            </button>
            {Object.keys(groupByCategory(notifications)).map((category) => (
              <button
                key={category}
                type="button"
                className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 transition`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 space-y-4">
          {/* Render filtered notifications */}
          {filteredNotifications().map((notification) => (
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