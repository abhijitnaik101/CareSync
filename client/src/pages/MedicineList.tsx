import React, { useState } from "react";
import MedicineDetail from "./MedicineDetail"; // Adjust the import path as needed

const MedicineList = ({ medicines }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Filter medicines based on search term and selected type
  const filteredMedicines = medicines.filter(medicine => {
    const matchesName = medicine.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "" || medicine.type === selectedType;
    return matchesName && matchesType;
  });

  // Handle opening the modal
  const handleOpenModal = (medicine) => {
    setSelectedMedicine(medicine);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedMedicine(null);
  };

  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 w-1/4 p-4 text-white">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <ul className="list-none p-0">
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700">
              Appointment
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700">
              Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700">
              Notifications
            </a>
          </li>
        </ul>
      </div>
      <div className="bg-gray-100 w-3/4 p-4">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="ml-2 px-3 py-2 rounded-md bg-blue-500 text-white"
              onClick={() => setSearchTerm(searchTerm)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="capsules">Capsules</option>
              <option value="tablets">Tablets</option>
              <option value="powders">Powders</option>
              <option value="ointments">Ointments</option>
              <option value="creams">Creams</option>
              <option value="injectables">Injectables</option>
              <option value="gels">Gels</option>
              <option value="drops">Drops</option>
            </select>
          </div>
        </div>
        {filteredMedicines.length === 0 ? (
          <p className="text-center text-gray-500">No medicine found</p>
        ) : (
          <table className="w-full text-left table-auto text-gray-500">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Expiry</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td className="px-4 py-3">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded-md"
                      onClick={() => handleOpenModal(medicine)}
                    >
                      +
                    </button>
                  </td>
                  <td className="px-4 py-3">{medicine.name}</td>
                  <td className="px-4 py-3">{medicine.price}</td>
                  <td className="px-4 py-3">{medicine.quantity}</td>
                  <td className="px-4 py-3 text-red-500">{medicine.expiry}</td>
                  <td className="px-4 py-3">{medicine.type}</td>
                  <td className="px-4 py-3">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md"
                      onClick={() => handleOpenModal(medicine)}
                    >
                      details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selectedMedicine && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <MedicineDetail
              medicineName={selectedMedicine.name}
              inStock={selectedMedicine.quantity}
              expDate={selectedMedicine.expiry}
              mfgDate="N/A" // Assuming mfgDate is not part of the initial data
              price={selectedMedicine.price}
              category="N/A" // Assuming category is not part of the initial data
              type={selectedMedicine.type}
              description="N/A" // Assuming description is not part of the initial data
            />
            <button
              className="absolute top-4 right-4 text-2xl text-white"
              onClick={handleCloseModal}
            >
              &#x2715;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineList;
