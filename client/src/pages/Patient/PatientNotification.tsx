import React, { useEffect, useState } from "react";
import { socket } from "../../socket";
import {
  FaSearch,
  FaHospital,
  FaUserMd,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

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
    scheduledOn: "2024-11-20T22:30:00",
    img: "https://via.placeholder.com/100", // Placeholder for doctor image
  },
  {
    id: 2,
    doctor: "Dr John Doe",
    hospital: "City Hospital",
    department: "Neurology",
    status: "Pending",
    scheduledOn: "2024-11-21T14:00:00",
    img: "https://via.placeholder.com/100", // Placeholder for doctor image
  },
];

// Utility to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const PatientNotification: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appointments, setAppointments] = useState(appointmentsData);
  const [editingAppointmentId, setEditingAppointmentId] = useState<
    number | null
  >(null);
  const [newScheduledDate, setNewScheduledDate] = useState<string>("");

  useEffect(() => {
    socket.on("UserTicket", (data: any) => {
      setAppointments((prevAppointments) => [data, ...prevAppointments]);
    });

    socket.on("reject-patient-request", (patient: any) => {
      // Handle rejection
    });

    return () => {
      socket.off("UserTicket");
    };
  }, []);

  const filterAppointments = () => {
    const lowerQuery = searchQuery.toLowerCase();
    const currentTime = new Date();

    return appointments.filter((appointment) => {
      const scheduledTime = new Date(appointment.scheduledOn);
      const differenceInMinutes =
        (scheduledTime.getTime() - currentTime.getTime()) / 60000;

      const matchesQuery =
        appointment.doctor.toLowerCase().includes(lowerQuery) ||
        appointment.hospital.toLowerCase().includes(lowerQuery);

      const matchesTimePeriod =
        selectedPeriod === null || differenceInMinutes <= selectedPeriod;

      return matchesQuery && matchesTimePeriod;
    });
  };

  const filteredAppointments = filterAppointments();

  const handleRescheduleClick = (
    appointmentId: number,
    currentDate: string
  ) => {
    setEditingAppointmentId(appointmentId);
    setNewScheduledDate(currentDate);
  };

  const handleSaveDate = (appointmentId: number) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, scheduledOn: newScheduledDate }
          : appointment
      )
    );
    setEditingAppointmentId(null);
  };

  const handleCancel = () => {
    setEditingAppointmentId(null);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-poppins">
      {/* Main Content */}
      <div className="flex-grow p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Notifications</h1>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <FaSearch className="absolute left-2 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="px-10 py-2 w-full sm:w-auto bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="bg-gray-800 p-4 sm:p-6 mb-4 rounded-lg shadow-md transition transform hover:scale-105 duration-300 ease-in-out"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={appointment.img}
                    alt={`${appointment.doctor}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {appointment.doctor}
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      <FaHospital className="inline-block mr-1" />
                      {appointment.hospital}
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base">
                      <FaUserMd className="inline-block mr-1" />
                      {appointment.department}
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base">
                      <FaCalendarAlt className="inline-block mr-1" />
                      {formatDate(appointment.scheduledOn)}
                    </p>
                    <p
                      className={`text-sm sm:text-base font-bold ${
                        appointment.status === "Confirmed"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {appointment.status === "Confirmed" ? (
                        <FaCheckCircle className="inline-block mr-1" />
                      ) : (
                        <FaTimesCircle className="inline-block mr-1" />
                      )}
                      {appointment.status}
                    </p>
                  </div>
                </div>
                {editingAppointmentId === appointment.id ? (
                  <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-4 sm:mt-0">
                    <input
                      type="datetime-local"
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
                      value={newScheduledDate}
                      onChange={(e) => setNewScheduledDate(e.target.value)}
                    />
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={() => handleSaveDate(appointment.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-4 sm:mt-0"
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
