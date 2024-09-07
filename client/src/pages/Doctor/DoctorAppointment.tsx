import React from "react";

const DoctorsAppointment: React.FC = () => {
  return (
    <div className="p-6 mx-auto max-w-7xl">
      {/* Top Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-500">Pending Patients</p>
            <p className="text-3xl font-bold text-blue-600">5</p>
          </div>
          <div className="text-blue-600 text-3xl">
            <i className="fas fa-users"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-500">Rescheduled Appointments</p>
            <p className="text-3xl font-bold text-yellow-500">2</p>
          </div>
          <div className="text-yellow-500 text-3xl">
            <i className="fas fa-calendar-alt"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-500">Checked Patients</p>
            <p className="text-3xl font-bold text-green-600">5</p>
          </div>
          <div className="text-green-600 text-3xl">
            <i className="fas fa-check"></i>
          </div>
        </div>
      </div>

      {/* First Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-4">
                <input type="checkbox" />
              </th>
              <th className="p-4">Patient</th>
              <th className="p-4">Serial No.</th>
              <th className="p-4">Time</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Saswat Kumar Dash",
                serial: "20",
                time: "10:25",
                gender: "female",
              },
              {
                name: "Priyanka Behera",
                serial: "21",
                time: "10:40",
                gender: "male",
              },
              {
                name: "Sandeep Pradhan",
                serial: "22",
                time: "11:00",
                gender: "female",
              },
              {
                name: "Rasminarjan Nayak",
                serial: "23",
                time: "11:15",
                gender: "female",
              },
              {
                name: "Krishna Kumar Khuntia",
                serial: "24",
                time: "11:30",
                gender: "female",
              },
            ].map((patient, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4">{patient.name}</td>
                <td className="p-4 text-blue-600">{patient.serial}</td>
                <td className="p-4">{patient.time}</td>
                <td className="p-4">
                  <span
                    className={`text-${
                      patient.gender === "male" ? "blue" : "pink"
                    }-600 capitalize`}
                  >
                    {patient.gender}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-blue-600 bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Second Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="p-4">
                <input type="checkbox" />
              </th>
              <th className="p-4">Patient</th>
              <th className="p-4">Serial No.</th>
              <th className="p-4">Time</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Status</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Saswat Kumar Dash",
                serial: "25",
                time: "12:00",
                gender: "female",
                status: "checking",
              },
              {
                name: "Priyanka Behera",
                serial: "26",
                time: "12:15",
                gender: "male",
                status: "pending",
              },
              // Add other rows as needed...
            ].map((patient, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4">{patient.name}</td>
                <td className="p-4 text-blue-600">{patient.serial}</td>
                <td className="p-4">{patient.time}</td>
                <td className="p-4">
                  <span
                    className={`text-${
                      patient.gender === "male" ? "blue" : "pink"
                    }-600 capitalize`}
                  >
                    {patient.gender}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`text-${
                      patient.status === "checking" ? "green" : "yellow"
                    }-600 capitalize`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-red-600 bg-red-100 p-2 rounded-lg hover:bg-red-200 transition">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsAppointment;
