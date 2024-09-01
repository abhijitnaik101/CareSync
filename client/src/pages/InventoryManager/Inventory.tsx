import React, { useState } from "react";
import MedicineDetail from "./MedicineDetail"; // Adjust the import path as needed


const medicines = [
  { id: 1, name: "Paracetamol", price: 40, quantity: 45, expiry: "12/2025", type: "tablets" },
  { id: 2, name: "Ibuprofen", price: 50, quantity: 30, expiry: "10/2024", type: "capsules" },
  { id: 3, name: "Amoxicillin", price: 60, quantity: 20, expiry: "08/2024", type: "tablets" },
  { id: 4, name: "Cetirizine", price: 35, quantity: 50, expiry: "07/2026", type: "tablets" },
  { id: 5, name: "Metformin", price: 70, quantity: 25, expiry: "05/2025", type: "tablets" },
  { id: 6, name: "Loratadine", price: 55, quantity: 40, expiry: "06/2025", type: "tablets" },
  { id: 7, name: "Omeprazole", price: 80, quantity: 15, expiry: "01/2024", type: "capsules" },
  { id: 8, name: "Amlodipine", price: 90, quantity: 22, expiry: "03/2024", type: "tablets" },
  { id: 9, name: "Hydrochlorothiazide", price: 65, quantity: 18, expiry: "11/2024", type: "tablets" },
  { id: 10, name: "Simvastatin", price: 75, quantity: 27, expiry: "02/2025", type: "tablets" },
  { id: 11, name: "Vitamin C Powder", price: 25, quantity: 100, expiry: "09/2025", type: "powders" },
  { id: 12, name: "Anti-Itch Cream", price: 45, quantity: 50, expiry: "12/2025", type: "creams" },
  { id: 13, name: "Antibiotic Ointment", price: 40, quantity: 35, expiry: "04/2025", type: "ointments" },
  { id: 14, name: "Insulin Injection", price: 120, quantity: 10, expiry: "06/2024", type: "injectables" },
  { id: 15, name: "Hydrocortisone Gel", price: 50, quantity: 25, expiry: "08/2025", type: "gels" },
  { id: 16, name: "Nasal Drops", price: 30, quantity: 60, expiry: "11/2024", type: "drops" },
  { id: 17, name: "Antiseptic Gel", price: 55, quantity: 40, expiry: "03/2025", type: "gels" }
];

const Inventory = () => {
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
      <div className="bg-gray-100 w-full p-4">
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

export default Inventory;
