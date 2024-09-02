import React from "react";

interface Patient {
  name: string;
  bed: number;
  gender: string;
  status: string;
}

interface AdministratorWardProps {
  patients: Patient[];
}
 
const AdministratorWard: React.FC<AdministratorWardProps> = ({ patients }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* Container */}
      <div className=" mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Beds Overview */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
          <div className="text-2xl font-bold text-gray-800">Beds</div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <div className="text-blue-600">
              Total{" "}
              <span className="font-bold bg-blue-100 px-3 py-1 rounded-lg">
                50
              </span>
            </div>
            <div className="text-red-600">
              Occupied{" "}
              <span className="font-bold bg-red-100 px-3 py-1 rounded-lg">
                5
              </span>
            </div>
            <div className="text-green-600">
              Available{" "}
              <span className="font-bold bg-green-100 px-3 py-1 rounded-lg">
                45
              </span>
            </div>
          </div>
        </div>

        {/* Ward Selector */}
        <div className="flex items-center space-x-4 mb-6">
          <label className="text-lg font-medium text-gray-700">Wards</label>
          <select className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500">
            <option>General</option>
            {/* Add more options as needed */}
          </select>
          <button className="ml-2 border border-gray-300 rounded-lg p-2 text-gray-700 hover:bg-gray-200">
            <span role="img" aria-label="settings">
              ⚙️
            </span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-800 bg-gray-100 border-b">
                  Patient
                </th>
                <th className="px-4 py-2 text-left text-gray-800 bg-gray-100 border-b">
                  Bed
                </th>
                <th className="px-4 py-2 text-left text-gray-800 bg-gray-100 border-b">
                  Gender
                </th>
                <th className="px-4 py-2 text-left text-gray-800 bg-gray-100 border-b">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-gray-800 bg-gray-100 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-4 text-gray-700">{patient.name}</td>
                  <td className="px-4 py-4 text-gray-700">{patient.bed}</td>
                  <td className="px-4 py-4 text-gray-700">{patient.gender}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        patient.status === "Occupied"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium rounded-lg border border-blue-600 px-4 py-2 transition">
                        Details
                      </button>
                      <button
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          patient.status === "Occupied"
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                      >
                        {patient.status === "Occupied" ? "Discharge" : "Admit"}
                      </button>
                    </div>
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

export default AdministratorWard;
