import React from "react";

const DoctorsAppointment: React.FC = () => {
  return (
    <div className="p-6 w-80%">
      {/* Top Counters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-600">Pending Patients</p>
            <p className="text-2xl font-bold text-blue-600">5</p>
          </div>
          <div className="text-blue-600">
            {/* Icon for pending patients */}
            <i className="fas fa-users"></i>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-600">Rescheduled Appointment</p>
            <p className="text-2xl font-bold text-yellow-600">2</p>
          </div>
          <div className="text-yellow-600">
            {/* Icon for rescheduled appointments */}
            <i className="fas fa-calendar-alt"></i>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-600">Checked Patients</p>
            <p className="text-2xl font-bold text-green-600">5</p>
          </div>
          <div className="text-green-600">
            {/* Icon for checked patients */}
            <i className="fas fa-check"></i>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Patient</th>
              <th className="p-3">Serial No.</th>
              <th className="p-3">Time</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Status</th>
              <th className="p-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Rows */}
            {[
              {
                name: "Saswat Kumar Dash",
                serial: "20",
                time: "10:25",
                gender: "female",
                status: "checking",
              },
              {
                name: "Priyanka Behera",
                serial: "20",
                time: "10:25",
                gender: "male",
                status: "pending",
              },
              {
                name: "Sandeep Pradhan",
                serial: "20",
                time: "10:25",
                gender: "female",
                status: "pending",
              },
              {
                name: "Rasminarjan Nayak",
                serial: "20",
                time: "10:25",
                gender: "female",
                status: "pending",
              },
              {
                name: "Krishna Kumar Khuntia",
                serial: "20",
                time: "10:25",
                gender: "female",
                status: "pending",
              },
            ].map((patient, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3">{patient.name}</td>
                <td className="p-3 text-blue-600">{patient.serial}</td>
                <td className="p-3">{patient.time}</td>
                <td className="p-3">
                  <span
                    className={`text-${
                      patient.gender === "male" ? "blue" : "pink"
                    }-600`}
                  >
                    {patient.gender}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`text-${
                      patient.status === "checking" ? "green" : "yellow"
                    }-600`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="bg-gray-200 p-2 rounded-lg">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Patient</th>
              <th className="p-3">Serial No.</th>
              <th className="p-3">Time</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Status</th>
              <th className="p-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Rows can be similar to the first table */}
            {[
              {
                name: "Saswat Kumar Dash",
                serial: "20",
                time: "10:25",
                gender: "female",
                status: "checking",
              },
              {
                name: "Priyanka Behera",
                serial: "20",
                time: "10:25",
                gender: "male",
                status: "pending",
              },
              // Add other rows as needed...
            ].map((patient, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3">{patient.name}</td>
                <td className="p-3 text-blue-600">{patient.serial}</td>
                <td className="p-3">{patient.time}</td>
                <td className="p-3">
                  <span
                    className={`text-${
                      patient.gender === "male" ? "blue" : "pink"
                    }-600`}
                  >
                    {patient.gender}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`text-${
                      patient.status === "checking" ? "green" : "yellow"
                    }-600`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="bg-gray-200 p-2 rounded-lg">
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
