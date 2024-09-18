import React, { useState } from "react";
import {
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

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

  // Map notification types to corresponding icons
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "Low Stock":
        return <FaExclamationTriangle className="text-yellow-400" />;
      case "Expired Medicine":
        return <FaClock className="text-red-400" />;
      case "Restocked":
        return <FaBoxOpen className="text-green-400" />;
      case "New Medicine":
        return <FaCheckCircle className="text-blue-400" />;
      default:
        return <FaBoxOpen className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 to-black text-white min-h-screen p-6">
      <h2 className="text-3xl font-semibold text-gray-200">
        Inventory Notifications
      </h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="p-2">Type</th>
                <th className="p-2">Message</th>
                <th className="p-2">Time</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className={`border-t border-gray-700 ${
                    notification.status === "unread" ? "bg-gray-700" : ""
                  }`}
                >
                  <td className="p-2 flex items-center space-x-2">
                    {getNotificationIcon(notification.type)}
                    <span>{notification.type}</span>
                  </td>
                  <td className="p-2 text-gray-300">{notification.message}</td>
                  <td className="p-2 text-gray-400">{notification.time}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        notification.status === "unread"
                          ? "bg-red-200 text-red-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {notification.status === "unread" ? "Unread" : "Read"}
                    </span>
                  </td>
                  <td className="p-2">
                    {notification.status === "unread" && (
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
