import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FaBell } from 'react-icons/fa';

// Establish socket connection
const socket = io('http://localhost:5000'); // Replace with your backend URL

const DoctorNotification = () => {
  // Initial dummy notifications
  const initialNotifications = {
    appointment: [
      {
        title: 'Upcoming Appointment',
        message: 'You have an appointment with John Doe at 3:00 PM today.',
      },
      {
        title: 'Rescheduled Appointment',
        message: 'The appointment with Sarah Smith has been rescheduled to 2:30 PM tomorrow.',
      },
    ],
    test: [
      {
        title: 'New Lab Test Results',
        message: 'Lab results for patient Emily Davis are now available.',
      },
    ],
    administrative: [
      {
        title: 'Prescription Request',
        message: 'Patient Emma Thompson has requested a refill for their prescription.',
      },
    ],
    reminder: [
      {
        title: 'Prescription Renewal Reminder',
        message: 'Reminder: The prescription for patient Mark Anderson expires in 5 days.',
      },
    ],
  };

  // Notifications state: storing categorized notifications
  const [notifications, setNotifications] = useState(initialNotifications);

  // State to track active notification category
  const [activeCategory, setActiveCategory] = useState('appointment');

  // State to track unread notifications
  const [unreadNotifications, setUnreadNotifications] = useState({
    appointment: initialNotifications.appointment.length,
    test: initialNotifications.test.length,
    administrative: initialNotifications.administrative.length,
    reminder: initialNotifications.reminder.length,
  });

  useEffect(() => {
    // Listen for incoming notifications via Socket.IO
    socket.on('new-notification', (notification) => {
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
      socket.off('new-notification');
    };
  }, []);

  // Mark notifications as read for the active category
  const markAsRead = (category) => {
    setUnreadNotifications((prev) => ({
      ...prev,
      [category]: 0,
    }));
  };

  // Render notifications based on the active category
  const renderNotifications = (category) => {
    return notifications[category].map((notification, index) => (
      <div key={index} className="bg-white shadow rounded-lg p-4 mb-4">
        <h3 className="text-lg font-bold">{notification.title}</h3>
        <p className="text-gray-600">{notification.message}</p>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Doctor Notifications</h1>
        <FaBell className="text-3xl text-yellow-500" />
      </div>

      {/* Notification Tabs */}
      <div className="flex mb-4 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            activeCategory === 'appointment' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => {
            setActiveCategory('appointment');
            markAsRead('appointment');
          }}
        >
          Appointments
          {unreadNotifications.appointment > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {unreadNotifications.appointment}
            </span>
          )}
        </button>

        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            activeCategory === 'test' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => {
            setActiveCategory('test');
            markAsRead('test');
          }}
        >
          Tests
          {unreadNotifications.test > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {unreadNotifications.test}
            </span>
          )}
        </button>

        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            activeCategory === 'administrative' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => {
            setActiveCategory('administrative');
            markAsRead('administrative');
          }}
        >
          Administrative
          {unreadNotifications.administrative > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {unreadNotifications.administrative}
            </span>
          )}
        </button>

        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            activeCategory === 'reminder' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => {
            setActiveCategory('reminder');
            markAsRead('reminder');
          }}
        >
          Reminders
          {unreadNotifications.reminder > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {unreadNotifications.reminder}
            </span>
          )}
        </button>
      </div>

      {/* Display Notifications based on the active category */}
      <div className="grid grid-cols-1 gap-4">
        {renderNotifications(activeCategory)}
      </div>
    </div>
  );
};

export default DoctorNotification;
