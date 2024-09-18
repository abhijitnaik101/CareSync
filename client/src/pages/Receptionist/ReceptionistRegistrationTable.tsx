import React from "react";

interface Registration {
  name: string;
  appointmentDate: string;
  gender: string;
  contact: string;
  appointType: string;
}

interface ReceptionistRegistrationTableProps {
  registrations: Registration[];
}

export default function ReceptionistRegistrationTable({
  registrations,
}: ReceptionistRegistrationTableProps) {
  return (
    <div className="bg-gray-800 text-gray-100 shadow-md rounded-md p-4">
      <table className="min-w-full bg-gray-900 rounded-md overflow-hidden">
        <thead>
          <tr className="bg-indigo-600 text-gray-100">
            <th className="px-4 py-2 text-left">Patient</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Gender</th>
            <th className="px-4 py-2 text-left">Contact</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((row, index) => (
            <tr
              key={index}
              className="border-t border-gray-700 hover:bg-gray-700"
            >
              <td className="px-4 py-2">{row.name}</td>
              <td className="px-4 py-2">{row.appointmentDate}</td>
              <td className="px-4 py-2">{row.gender}</td>
              <td className="px-4 py-2">{row.contact}</td>
              <td className="px-4 py-2">{row.appointType}</td>
              <td className="px-4 py-2 text-blue-400">
                <button className="hover:underline focus:outline-none">
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
