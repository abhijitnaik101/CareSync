import React, { useState } from "react";
import { FaFilePrescription, FaInfoCircle } from "react-icons/fa"; // React icons for buttons

interface HistoryItem {
  hospital: string;
  doctor: string;
  visitDate: string;
  disease: string;
}

interface HistoryCardProps {
  item: HistoryItem;
  onPrescriptionClick: () => void;
  onDetailsClick: () => void;
}

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

// Sample Data
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

// HistoryCard Component
const HistoryCard: React.FC<HistoryCardProps> = ({
  item,
  onPrescriptionClick,
  onDetailsClick,
}) => {
  return (
    <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg flex justify-between items-center">
      <div>
        <p className="font-medium text-white">{item.hospital}</p>
        <p className="text-sm text-gray-400">Dr. {item.doctor}</p>
      </div>
      <div className="text-sm text-gray-400">
        <p>Visit Date</p>
        <p>{item.visitDate}</p>
      </div>
      <div className="text-sm text-gray-400">
        <p>Disease</p>
        <p>{item.disease}</p>
      </div>
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md hover:bg-purple-700 flex items-center space-x-1"
          onClick={onPrescriptionClick}
        >
          <FaFilePrescription /> <span>Prescription</span>
        </button>
        <button
          className="px-4 py-2 border border-gray-600 text-gray-400 rounded-md hover:bg-gray-700 flex items-center space-x-1"
          onClick={onDetailsClick}
        >
          <FaInfoCircle /> <span>Details</span>
        </button>
      </div>
    </div>
  );
};

// Modal Component
const Modal: React.FC<ModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
        <p className="text-gray-300">{content}</p>
        <button
          className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-md hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// PatientHistory Component
const PatientHistory: React.FC = () => {
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
    <div
      className="w-full flex flex-col p-6 mx-auto shadow-lg bg-gray-900 h-screen"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1558980664-10b1b5d321f6?crop=entropy&fit=crop&w=1200&q=80)", // Background image
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Medical History</h2>

      {/* Search Section */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search hospital or doctor"
          className="p-3 w-full rounded-md bg-gray-800 text-white border border-gray-600"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-gray-800 border border-gray-600 w-full mt-1 rounded-md shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-700 text-white"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <input
          type="date"
          className="p-3 mt-4 w-full rounded-md bg-gray-800 text-white border border-gray-600"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* History Cards */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <HistoryCard
              key={index}
              item={item}
              onPrescriptionClick={() => setShowPrescriptionModal(true)}
              onDetailsClick={() => setShowDetailsModal(true)}
            />
          ))
        ) : (
          <p className="text-gray-400">No results found</p>
        )}
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <Modal
          title="Prescription"
          content="Details of the prescription go here..."
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && (
        <Modal
          title="Details"
          content="More details about the visit go here..."
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default PatientHistory;
