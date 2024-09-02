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
    <>
      <div className="p-6">
        {/* Beds Overview */}
        <div className="flex flex-col justify-between mb-4">
          <div className="font-bold text-[30px]">Beds</div>
          <div className="inline-flex border border-gray-400 rounded-md p-2 space-x-8">
            <div className="text-blue-500">
              total-{" "}
              <span className="font-bold border bg-blue-100 p-1 px-2 rounded-lg">
                50
              </span>
            </div>
            <div className="text-red-500">
              occupied{" "}
              <span className="font-bold border bg-red-100 p-1 px-2 rounded-lg">
                5
              </span>
            </div>
            <div className="text-green-500">
              available{" "}
              <span className="font-bold border bg-green-100 p-1 px-2 rounded-lg">
                45
              </span>
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
                        patient.status === "Occupied"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-green-100 text-green-500"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-2 py-2 ">
                    <div className="space-x-10">
                      <button className="text-blue-500 border-2 rounded p-[3px]">
                        details
                      </button>
                      <button
                        className={`ml-[50px] px-2 py-1 rounded ${
                          patient.status === "Occupied"
                            ? "bg-red-100 text-red-500"
                            : "bg-green-100 text-green-500"
                        }`}
                      >
                        {patient.status === "Occupied" ? "discharge" : "admit"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdministratorWard;
