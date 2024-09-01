import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewRegistration from "./NewRegistration";

interface RegistrationProps {
  registrations: {
    name: string;
    age: string;
    gender: string;
    department: string;
    visitDate: string;
    contact: string;
    register: string;
    visit: string;
  }[];
}

const Registration: React.FC<RegistrationProps> = ({ registrations: initialRegistrations }) => {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleNewRegistrationClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleNewRegistration = (formData: {
    name: string;
    age: string;
    gender: string;
    department: string;
    visitDate: string;
    contact: string;
    nationalId: string;
  }) => {
    const newRegistration = {
      ...formData,
      register: "Registered", // Assuming the status on registration
      visit: "Scheduled" // Assuming the visit is scheduled
    };
    
    // Add the new registration to the existing list
    setRegistrations([...registrations, newRegistration]);

    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-900 text-white h-screen p-4">
        <ul>
          <li className="p-4 cursor-pointer hover:bg-gray-700">Registration</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-6">
        {/* Total Registration */}
        <div className="flex justify-between mb-4">
          <div className="text-gray-700">Total registration</div>
          <div className="flex space-x-4">
            <div className="text-blue-500">
              male <span className="font-bold">50</span>
            </div>
            <div className="text-red-500">
              female <span className="font-bold">5</span>
            </div>
            <div className="text-green-500">
              elder <span className="font-bold">45</span>
            </div>
          </div>
          <div className="text-gray-700">Registration request</div>
          <div className="flex space-x-4">
            <div className="text-green-500">
              approved <span className="font-bold">50</span>
            </div>
            <div className="text-yellow-500">
              pending <span className="font-bold">50</span>
            </div>
          </div>
        </div>

        {/* New Registration */}
        <div className="mb-4">
          <label className="text-gray-700">New registration</label>
          <button
            className="ml-2 border p-1 rounded bg-gray-200"
            onClick={handleNewRegistrationClick} // Open the modal on click
          >
            <span role="img" aria-label="add">
              ➕
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
                  date
                </th>
                <th className="px-4 py-2 text-left text-blue-900 bg-blue-100">
                  gender
                </th>
                <th className="px-4 py-2 text-left text-blue-900 bg-blue-100">
                  register
                </th>
                <th className="px-4 py-2 text-left text-blue-900 bg-blue-100">
                  visit
                </th>
                <th className="px-4 py-2 text-left text-blue-900 bg-blue-100"></th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">{row.visitDate}</td>
                  <td className="px-4 py-2">{row.gender}</td>
                  <td className="px-4 py-2">{row.register}</td>
                  <td className="px-4 py-2">{row.visit}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500">details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for New Registration */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <NewRegistration
              onNewRegistration={handleNewRegistration}
            />
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-white text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
