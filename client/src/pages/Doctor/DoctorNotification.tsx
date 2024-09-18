import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaSun,
  FaMoon,
  FaCalendarAlt,
  FaFlask,
  FaPrescriptionBottle,
  FaClock,
} from "react-icons/fa";
import { socket } from "../../socket";

const DoctorNotification = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const initialNotifications = {
    appointment: [
      {
        title: "Upcoming Appointment",
        message: "You have an appointment with John Doe at 3:00 PM today.",
      },
      {
        title: "Rescheduled Appointment",
        message:
          "The appointment with Sarah Smith has been rescheduled to 2:30 PM tomorrow.",
      },
    ],
    test: [
      {
        title: "New Lab Test Results",
        message: "Lab results for patient Emily Davis are now available.",
      },
    ],
    administrative: [
      {
        title: "Prescription Request",
        message:
          "Patient Emma Thompson has requested a refill for their prescription.",
      },
    ],
    reminder: [
      {
        title: "Prescription Renewal Reminder",
        message:
          "Reminder: The prescription for patient Mark Anderson expires in 5 days.",
      },
    ],
  };

  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeCategory, setActiveCategory] = useState("appointment");
  const [unreadNotifications, setUnreadNotifications] = useState({
    appointment: initialNotifications.appointment.length,
    test: initialNotifications.test.length,
    administrative: initialNotifications.administrative.length,
    reminder: initialNotifications.reminder.length,
  });

  useEffect(() => {
    socket.on("new-notification", (notification) => {
      const { type } = notification;

      // Add the new notification to the correct category
      setNotifications((prev) => ({
        ...prev,
        [type]: [notification, ...prev[type]],
      }));

      // Increment unread notifications count for that category
      setUnreadNotifications((prev) => ({
        ...prev,
        [type]: prev[type] + 1,
      }));
    });

    return () => {
      socket.off("new-notification");
    };
  }, []);

  const markAsRead = (category) => {
    setUnreadNotifications((prev) => ({
      ...prev,
      [category]: 0,
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const renderNotifications = (category) => {
    return notifications[category].map((notification, index) => (
      <div
        key={index}
        className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-lg p-4 rounded-lg mb-4 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-800 dark:to-gray-700"
      >
        <h3 className="text-lg font-bold text-gray-100">
          {notification.title}
        </h3>
        <p className="text-sm text-gray-400 mt-2">{notification.message}</p>
      </div>
    ));
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white dark:text-gray-100">
            Doctor Notifications
          </h1>
          <div className="flex items-center space-x-4">
            <FaBell className="text-4xl text-yellow-400 animate-pulse" />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-800 text-gray-100 hover:bg-gray-700 transition duration-300"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-blue-400" />
              )}
            </button>
          </div>
        </div>

        {/* Notification Tabs */}
        <div className="flex mb-6 space-x-4">
          <button
            className={`px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 ${
              activeCategory === "appointment"
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 dark:bg-gray-700"
            }`}
            onClick={() => {
              setActiveCategory("appointment");
              markAsRead("appointment");
            }}
          >
            <FaCalendarAlt />
            <span>Appointments</span>
            {unreadNotifications.appointment > 0 && (
              <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                {unreadNotifications.appointment}
              </span>
            )}
          </button>

          <button
            className={`px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 ${
              activeCategory === "test"
                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 dark:bg-gray-700"
            }`}
            onClick={() => {
              setActiveCategory("test");
              markAsRead("test");
            }}
          >
            <FaFlask />
            <span>Tests</span>
            {unreadNotifications.test > 0 && (
              <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                {unreadNotifications.test}
              </span>
            )}
          </button>

          <button
            className={`px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 ${
              activeCategory === "administrative"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 dark:bg-gray-700"
            }`}
            onClick={() => {
              setActiveCategory("administrative");
              markAsRead("administrative");
            }}
          >
            <FaPrescriptionBottle />
            <span>Administrative</span>
            {unreadNotifications.administrative > 0 && (
              <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                {unreadNotifications.administrative}
              </span>
            )}
          </button>

          <button
            className={`px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 ${
              activeCategory === "reminder"
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 dark:bg-gray-700"
            }`}
            onClick={() => {
              setActiveCategory("reminder");
              markAsRead("reminder");
            }}
          >
            <FaClock />
            <span>Reminders</span>
            {unreadNotifications.reminder > 0 && (
              <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                {unreadNotifications.reminder}
              </span>
            )}
          </button>
        </div>

        {/* Display Notifications */}
        <div className="grid grid-cols-1 gap-6">
          {renderNotifications(activeCategory)}
        </div>
      </div>
    </div>
  );
};

export default DoctorNotification;
