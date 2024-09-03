// src/components/SearchBox.tsx
import React, { useEffect, useState } from 'react';
import { bhubaneswarHospitals } from '../../DB/HospitalLocations';

interface Hospital {
  hospital_id: number;
  name: string;
  coordinates: [number, number];
  departments: {
      department: string;
      doctors: number[];
  }[];
}

const hospitals: Hospital[] = bhubaneswarHospitals;

const SearchBox: React.FC = ({coordsCallback}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Hospital[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    coordsCallback(selectedCoordinates);
  }, [selectedCoordinates]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (hospital: Hospital) => {
    setSearchTerm(hospital.name);
    setSelectedCoordinates(hospital.coordinates);
    setSuggestions([]);
  };

  return (
    <div className="absolute w-full max-w-sm mx-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for hospitals..."
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((hospital) => (
            <li
              key={hospital.name}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectSuggestion(hospital)}
            >
              {hospital.name}
            </li>
          ))}
        </ul>
      )}
      {selectedCoordinates && (
        <div className="mt-4 p-2 bg-blue-50 rounded-md">
          <p>Selected Coordinates:</p>
          <p>Longitude: {selectedCoordinates[0]}</p>
          <p>Latitude: {selectedCoordinates[1]}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
