import React, { useState } from "react";

const InventoryNotification: React.FC = () => {
  // Dummy notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Low Stock",
      message: "Paracetamol is running low. Only 20 units left.",
      time: "2 hours ago",
      status: "unread",
    },
    {
      id: 2,
      type: "Expired Medicine",
      message: "Ibuprofen has expired on 2023-08-15.",
      time: "1 day ago",
      status: "unread",
    },
    {
      id: 3,
      type: "Restocked",
      message: "Amoxicillin has been restocked. 100 units added.",
      time: "3 days ago",
      status: "read",
    },
    {
      id: 4,
      type: "New Medicine",
      message: "New batch of Aspirin is available in stock.",
      time: "5 days ago",
      status: "read",
    },
  ]);

  // Handle the 'Mark as Read' button click
  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: "read" }
          : notification
      )
    );
  };

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-700">Inventory Notifications</h2>
      <div className="bg-white p-4 rounded shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="p-2">Type</th>
                <th className="p-2">Message</th>
                <th className="p-2">Time</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id} className={`border-t ${notification.status === 'unread' ? 'bg-yellow-50' : ''}`}>
                  <td className="p-2">{notification.type}</td>
                  <td className="p-2">{notification.message}</td>
                  <td className="p-2">{notification.time}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        notification.status === 'unread' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {notification.status === 'unread' ? 'Unread' : 'Read'}
                    </span>
                  </td>
                  <td className="p-2">
                    {notification.status === 'unread' && (
                      <button
                        className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryNotification;
