import React, { useState } from "react";

// Define the options for the time period dropdown
const timePeriodOptions = [
  { label: "5 min", value: 5 },
  { label: "30 min", value: 30 },
  { label: "1 hr", value: 60 },
  { label: "12 hr", value: 720 },
  { label: "24 hr", value: 1440 },
  { label: "7 day", value: 10080 },
  { label: "30 days", value: 43200 },
];

// Sample appointment data (array of objects)
const appointmentsData = [
  {
    id: 1,
    doctor: "Dr Anna Grace",
    hospital: "Apollo Hospital",
    department: "Cardiology",
    status: "Confirmed",
    scheduledOn: "2024-11-20T22:30:00", // ISO 8601 date format
  },
  {
    id: 2,
    doctor: "Dr John Doe",
    hospital: "City Hospital",
    department: "Neurology",
    status: "Pending",
    scheduledOn: "2024-11-21T14:00:00",
  },
  {
    id: 3,
    doctor: "Dr Jane Smith",
    hospital: "General Hospital",
    department: "Orthopedics",
    status: "Confirmed",
    scheduledOn: "2024-11-22T09:00:00",
  },
];

const PatientNotification: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appointments, setAppointments] = useState(appointmentsData);
  const [editingAppointmentId, setEditingAppointmentId] = useState<
    number | null
  >(null);
  const [newScheduledDate, setNewScheduledDate] = useState<string>("");

  // Function to filter appointments based on search query and time period
  const filterAppointments = () => {
    const lowerQuery = searchQuery.toLowerCase();
    const currentTime = new Date();

    return appointments.filter((appointment) => {
      const scheduledTime = new Date(appointment.scheduledOn);
      const differenceInMinutes =
        (scheduledTime.getTime() - currentTime.getTime()) / 60000;

      // Match search query with doctor name or hospital name
      const matchesQuery =
        appointment.doctor.toLowerCase().includes(lowerQuery) ||
        appointment.hospital.toLowerCase().includes(lowerQuery);

      // Check if the appointment falls within the selected time period
      const matchesTimePeriod =
        selectedPeriod === null || differenceInMinutes <= selectedPeriod;

      return matchesQuery && matchesTimePeriod;
    });
  };

  const filteredAppointments = filterAppointments();

  // Function to handle the "Reschedule" button click
  const handleRescheduleClick = (
    appointmentId: number,
    currentDate: string
  ) => {
    setEditingAppointmentId(appointmentId);
    setNewScheduledDate(currentDate);
  };

  // Function to handle saving the new date
  const handleSaveDate = (appointmentId: number) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, scheduledOn: newScheduledDate }
          : appointment
      )
    );
    setEditingAppointmentId(null); // Close the editing form
  };

  // Function to handle canceling the reschedule action
  const handleCancel = () => {
    setEditingAppointmentId(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white">
        <ul>
          <li className="py-4 px-6 hover:bg-gray-700 cursor-pointer">Map</li>
          <li className="py-4 px-6 hover:bg-gray-700 cursor-pointer bg-gray-700">
            Notification
          </li>
          <li className="py-4 px-6 hover:bg-gray-700 cursor-pointer">
            History
          </li>
          <li className="py-4 px-6 hover:bg-gray-700 cursor-pointer">
            Notifications
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Notification</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border rounded-lg focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-lg"
              onChange={(e) => setSelectedPeriod(Number(e.target.value))}
              value={selectedPeriod || ""}
            >
              <option value="" disabled>
                Select time period
              </option>
              {timePeriodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display filtered appointments */}
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-gray-100 p-6 mb-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">Your Appointment</h2>
                  <p>
                    Doctor:{" "}
                    <span className="font-bold">{appointment.doctor}</span>
                  </p>
                  <p>
                    Hospital:{" "}
                    <span className="font-bold">{appointment.hospital}</span>
                  </p>
                  <p>
                    Department:{" "}
                    <span className="font-bold">{appointment.department}</span>
                  </p>
                  <p>
                    Status:{" "}
                    <span className="font-bold">{appointment.status}</span>
                  </p>
                  <p>
                    Scheduled on:{" "}
                    <span className="font-bold">
                      {new Date(appointment.scheduledOn).toLocaleString()}
                    </span>
                  </p>
                </div>
                {editingAppointmentId === appointment.id ? (
                  <div className="flex space-x-4">
                    <input
                      type="datetime-local"
                      className="px-4 py-2 border rounded-lg focus:outline-none"
                      value={newScheduledDate}
                      onChange={(e) => setNewScheduledDate(e.target.value)}
                    />
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      onClick={() => handleSaveDate(appointment.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() =>
                      handleRescheduleClick(
                        appointment.id,
                        appointment.scheduledOn
                      )
                    }
                  >
                    Reschedule
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No appointments found matching the search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default PatientNotification;
