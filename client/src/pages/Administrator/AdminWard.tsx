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


const AdminWard: React.FC<AdministratorWardProps> = ({ patients }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-900 text-white h-screen p-4">
        <ul>
          <li className="p-4 cursor-pointer hover:bg-gray-700">Dashboard</li>
          <li className="p-4 cursor-pointer hover:bg-gray-700">Wards</li>
          <li className="p-4 cursor-pointer hover:bg-gray-700">OPDs</li>
          <li className="p-4 cursor-pointer hover:bg-gray-700">Profile</li>
          <li className="p-4 cursor-pointer hover:bg-gray-700">Notification</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        {/* Beds Overview */}
        <div className="flex justify-between mb-4">
          <div className="text-gray-700">Beds</div>
          <div className="flex space-x-4">
            <div className="text-blue-500">
              total <span className="font-bold">50</span>
            </div>
            <div className="text-red-500">
              occupied <span className="font-bold">5</span>
            </div>
            <div className="text-green-500">
              available <span className="font-bold">45</span>
            </div>
          </div>
        </div>

        {/* Ward Selector */}
        <div className="mb-4">
          <label className="text-gray-700">wards</label>
          <select className="ml-2 border p-1 rounded">
            <option>general</option>
            {/* Add more options as needed */}
          </select>
          <button className="ml-2 border p-1 rounded">
            <span role="img" aria-label="settings">
              ⚙️
            </span>
          </button>
        </div>

        {/* Table */}
        <div>
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-blue-900 bg-blue-100">
                  patient
                </th>
                <th className="px-4 py-2 text-left text-blue-900 bg-blue-100">
                  bed
                </th>
                <th className="px-4 py-2 text-left text-blue-900 bg-blue-100">
                  gender
                </th>
                <th className="px-4 py-2 text-left text-blue-900 bg-blue-100">
                  status
                </th>
                <th className="px-4 py-2 text-left text-blue-900 bg-blue-100"></th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{patient.name}</td>
                  <td className="px-4 py-2">{patient.bed}</td>
                  <td className="px-4 py-2">{patient.gender}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        patient.status === "occupied"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-green-100 text-green-500"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500">details</button>
                    <button
                      className={`ml-2 px-2 py-1 rounded ${
                        patient.status === "occupied"
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-500"
                      }`}
                    >
                      {patient.status === "occupied" ? "discharge" : "admit"}
                    </button>
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

export default AdminWard;
