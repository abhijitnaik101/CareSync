import React, { useState } from "react";

interface HistoryItem {
  hospital: string;
  doctor: string;
  visitDate: string;
  disease: string;
}

interface PatientHistoryProps {
  historyItems: HistoryItem[];
}

const historyItems = [
  {
    hospital: "Apollo Hospital",
    doctor: "Anna Grace",
    visitDate: "20/11/2024",
    disease: "P.Versicolor",
  },
  {
    hospital: "AIIMS",
    doctor: "Sophie Turner",
    visitDate: "05/09/2024",
    disease: "Hypertension",
  },
  {
    hospital: "Max Healthcare",
    doctor: "Robert Brown",
    visitDate: "22/08/2024",
    disease: "Asthma",
  },
  {
    hospital: "Manipal Hospital",
    doctor: "Olivia Williams",
    visitDate: "10/07/2024",
    disease: "Migraine",
  },
];

const PatientHistory: React.FC<PatientHistoryProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const newSuggestions = historyItems
      .filter(
        (item) =>
          item.hospital.toLowerCase().includes(value.toLowerCase()) ||
          item.doctor.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => `${item.hospital} - Dr. ${item.doctor}`);

    setSuggestions(newSuggestions);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion.split(" - ")[0]);
    setSuggestions([]);
  };

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      item.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !selectedDate || item.visitDate === selectedDate;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="w-full flex flex-col p-6 max-w-screen-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Medical History</h2>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search hospital or doctor"
          className="p-3 w-full rounded-md border border-gray-300"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <input
          type="date"
          className="p-3 mt-4 w-full rounded-md border border-gray-300"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-700">{item.hospital}</p>
                <p className="text-sm text-gray-500">Dr. {item.doctor}</p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Visit Date</p>
                <p>{item.visitDate}</p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Disease</p>
                <p>{item.disease}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => setShowPrescriptionModal(true)}
                >
                  Prescription
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={() => setShowDetailsModal(true)}
                >
                  Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Prescription</h3>
            <p>Details of the prescription go here...</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setShowPrescriptionModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <p>More details about the visit go here...</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;
