import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const DoctorAppointment: React.FC = () => {
  // Dummy data for the charts
  const prescriptionData = [
    { name: "Eye Poly", count: 2 },
    { name: "Neuro Poly", count: 3 },
    { name: "Surgical Poly", count: 5 },
    { name: "Lungs Poly", count: 4 },
    { name: "Nutrition Poly", count: 1 },
  ];

  const statisticsData = [
    { month: "Jan", patients: 400 },
    { month: "Feb", patients: 300 },
    { month: "Mar", patients: 500 },
    { month: "Apr", patients: 600 },
    { month: "May", patients: 700 },
    { month: "Jun", patients: 500 },
    { month: "Jul", patients: 600 },
    { month: "Aug", patients: 800 },
    { month: "Sep", patients: 700 },
    { month: "Oct", patients: 600 },
    { month: "Nov", patients: 500 },
    { month: "Dec", patients: 700 },
  ];

  // Dummy data for the Patient Queue List
  const queueData = [
    { name: "John Doe", time: "09:00 - 09:30", poly: "Eye Poly" },
    { name: "Jane Smith", time: "09:30 - 10:00", poly: "Neuro Poly" },
    { name: "Michael Johnson", time: "10:00 - 10:30", poly: "Surgical Poly" },
    { name: "Emily Davis", time: "10:30 - 11:00", poly: "Lungs Poly" },
    { name: "Daniel Brown", time: "11:00 - 11:30", poly: "Nutrition Poly" },
  ];

  return (
    <div className="flex-1 p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back,</h1>
          <p className="text-gray-600 text-sm">Raffialdo Bayu</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Find prescription medicine, poly, etc"
            className="p-1 w-80 bg-gray-100 rounded-lg text-sm"
          />
          <div className="relative">
            <img
              src="profile-pic.png"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="absolute bottom-0 right-0 block h-2 w-2 bg-green-500 rounded-full"></span>
          </div>
          <div>
            <p className="font-bold text-sm">Raffialdo Bayu</p>
            <p className="text-xs text-gray-600">Admin</p>
          </div>
        </div>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Patients</h2>
          <p className="text-blue-600 text-2xl font-bold mt-1">200K</p>
          <a href="#" className="text-blue-500 text-sm mt-2 block">
            View details →
          </a>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Staffs</h2>
          <p className="text-green-600 text-2xl font-bold mt-1">120K</p>
          <a href="#" className="text-green-500 text-sm mt-2 block">
            View details →
          </a>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Rooms</h2>
          <p className="text-red-600 text-2xl font-bold mt-1">160K</p>
          <a href="#" className="text-red-500 text-sm mt-2 block">
            View details →
          </a>
        </div>
      </div>

      {/* Charts and Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Patient Prescription */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold">Patient Prescription</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={prescriptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Queue List */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold">Patient Queue List</h2>
          <ul className="mt-2 space-y-2">
            {queueData.map((patient, index) => (
              <li key={index} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-bold">{patient.name}</p>
                  <p className="text-gray-600">{patient.time}</p>
                  <p className="text-gray-600">{patient.poly}</p>
                </div>
                <span className="material-icons">more_vert</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Statistics and Other Info */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Patient Statistics */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold">Patient Statistics</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={statisticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="patients" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Consultation Date */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold">Consultation Date</h2>
          <div className="flex flex-col items-center space-y-2 mt-4">
            {[
              {
                id: 1,
                type: "Neuro Poly",
                time: "10:00 - 11:30",
                doctor: "Dr. Ashton Cleve",
                bgColor: "bg-blue-100",
                textColor: "text-blue-600",
              },
              {
                id: 2,
                type: "Lungs Poly",
                time: "12:30 - 13:00",
                doctor: "Dr. Kylie Eloise",
                bgColor: "bg-gray-100",
                textColor: "text-gray-600",
              },
            ].map((consultation) => (
              <div
                key={consultation.id}
                className={`p-2 rounded-lg w-full text-center ${consultation.bgColor} ${consultation.textColor}`}
              >
                <p>{consultation.type}</p>
                <p>{consultation.time}</p>
                <p>{consultation.doctor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Vaccination */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold">Patient Vaccination</h2>
          <ul className="mt-2 space-y-2">
            {[
              {
                id: 1,
                name: "Casey Brave",
                time: "09:00 - 09:30",
                imgSrc: "patient-1.png",
              },
              {
                id: 2,
                name: "Darwin Haven",
                time: "09:30 - 10:00",
                imgSrc: "patient-2.png",
              },
              {
                id: 3,
                name: "Elric Presley",
                time: "10:00 - 10:30",
                imgSrc: "patient-3.png",
              },
            ].map((patient) => (
              <li
                key={patient.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={patient.imgSrc}
                    alt={`Patient ${patient.id}`}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{patient.name}</p>
                    <p className="text-gray-600">{patient.time}</p>
                  </div>
                </div>
                <span className="material-icons">detail</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
