import React, { useState } from 'react';

const DoctorNotification: React.FC = () => {
  // State to manage which notification to show
  const [activeNotification, setActiveNotification] = useState<string>('appointment');

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex border justify-between mb-4 border-b border-gray-300 pb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            onClick={() => setActiveNotification('appointment')}
          >
            Appointment
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            onClick={() => setActiveNotification('test')}
          >
            Tests
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            onClick={() => setActiveNotification('administrative')}
          >
            Administrative
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            onClick={() => setActiveNotification('reminder')}
          >
            Reminder
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {/* Conditional rendering based on activeNotification state */}
          {activeNotification === 'appointment' && (
            <div className="bg-green-100 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold">Upcoming Appointments</h3>
              <p className="text-gray-700">
                You have 3 upcoming appointments scheduled for today.
              </p>
            </div>
          )}
          {activeNotification === 'test' && (
            <div className="bg-gray-100 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold">Test Results Available</h3>
              <p className="text-gray-700">
                New lab results for patient Emily Davis are now available.
              </p>
            </div>
          )}
          {activeNotification === 'administrative' && (
            <div className="bg-gray-100 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold">New Prescription Request</h3>
              <p className="text-gray-700">
                Patient Emma Thompson has requested a refill for their prescription.
              </p>
            </div>
          )}
          {activeNotification === 'reminder' && (
            <div className="bg-yellow-100 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold">Prescription Renewal Reminder</h3>
              <p className="text-gray-700">
                Reminder: The prescription for patient Mark Anderson expires in 5 days.
              </p>
            </div>
          )}
          {/* Additional dummy notifications */}
          {activeNotification === 'emergency' && (
            <div className="bg-red-100 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold">Emergency Case</h3>
              <p className="text-gray-700">
                URGENT: Emergency case in the ER. Your immediate presence is required.
              </p>
            </div>
          )}
          {activeNotification === 'rescheduled' && (
            <div className="bg-gray-100 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold">Rescheduled Appointment</h3>
              <p className="text-gray-700">
                The appointment with Michael Brown has been rescheduled to September 2nd at 11:00 AM.
              </p>
            </div>
          )}
          {activeNotification === 'newAppointment' && (
            <div className="bg-gray-100 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold">New Appointment Booked</h3>
              <p className="text-gray-700">
                You have a new appointment with John Doe at 3:00 PM on September 1st.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorNotification;
