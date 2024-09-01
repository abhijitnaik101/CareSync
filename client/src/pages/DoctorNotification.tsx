import React from 'react';

const DoctorNotification: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          appointment
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          tests
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          administrative
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          reminder
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-red-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Emergency Case</h3>
          <p className="text-gray-700">
            URGENT: Emergency case in the ER. Your immediate presence is required.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">New appointment booked</h3>
          <p className="text-gray-700">
            You have a new appointment with John Doe at 3:00 PM on September 1st.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Rescheduled appointment</h3>
          <p className="text-gray-700">
            The appointment with Michael Brown has been rescheduled to September
            2nd at 11:00 AM.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Test Results Available</h3>
          <p className="text-gray-700">
            New lab results for patient Emily Davis are now available.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">New Prescription Request</h3>
          <p className="text-gray-700">
            Patient Emma Thompson has requested a refill for their prescription.
          </p>
        </div>
        <div className="bg-yellow-100 rounded-lg p-4">
          <h3 className="text-lg font-bold">Prescription Renewal Reminder</h3>
          <p className="text-gray-700">
            Reminder: The prescription for patient Mark Anderson expires in 5 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorNotification;