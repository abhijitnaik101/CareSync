import React, { useState } from "react";

interface HistoryItem {
  hospital: string;
  doctor: string;
  visitDate: string;
  disease: string;
}

interface HospitalHistoryProps {
  historyItems: HistoryItem[];
}

const HospitalHistory: React.FC<HospitalHistoryProps> = ({ historyItems }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  // Filter logic to handle both search term and selected date
  const filteredItems = historyItems.filter((item) => {
    const matchesSearch =
      item.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      !selectedDate || item.visitDate === selectedDate;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 h-screen">
        <ul>
          <li className="p-4 cursor-pointer hover:bg-gray-700">Map</li>
          <li className="p-4 cursor-pointer hover:bg-gray-700">Appointment</li>
          <li className="p-4 cursor-pointer bg-gray-700">History</li>
          <li className="p-4 cursor-pointer hover:bg-gray-700">
            Notifications
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Medical history</h2>

        {/* Search Bar */}
        <div className="mb-6 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-lg p-2 w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-r-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <input
            type="date"
            className="border rounded-lg p-2"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        {/* History Items */}
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.hospital}</p>
                  <p className="text-sm text-gray-500">Dr. {item.doctor}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>visit date</p>
                  <p>{item.visitDate}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>disease</p>
                  <p>{item.disease}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                    prescription
                  </button>
                  <button className="px-4 py-2 border rounded-lg">details</button>
                </div>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalHistory;
