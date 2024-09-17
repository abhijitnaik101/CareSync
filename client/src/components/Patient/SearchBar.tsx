import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { route } from '../../../backendroute';
import SideBarHospital from './SideBarHospital';

interface Hospital {
  id: number;
  name: string;
  coordinates: [string, string];
  services: string[];
  departments: Department[];
}

interface Department {
  id: number;
  name: string;
  hospitalId: number;
  doctors: Doctor[];
}

interface Doctor {
  id: number;
  name: string;
  averageTreatmentTime: number;
}

const SearchBar: React.FC<{ coordsCallback: (coords: number[] | null) => void }> = ({ coordsCallback }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Hospital[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<number[] | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  

  async function fetchHospitals() {
    try {
      
      const response = await axios.get(route + '/hospitals');
      setHospitals(response.data);
      console.log('fetched hospitals', response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHospitals();
  }, []);

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
    setSelectedCoordinates(hospital.coordinates.reverse().map(Number) as number[]);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="absolute top-0 left-0 ml-6 w-full max-w-md mx-auto mt-8 z-10">
        <div className="flex items-center border border-gray-300 rounded-md shadow-sm bg-indigo-500">
          <FaSearch className="mx-3 text-white" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for hospitals..."
            className="w-full p-2 pl-10 border-none rounded-l-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {suggestions.map((hospital) => (
              <li
                key={hospital.id}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelectSuggestion(hospital)}
              >
                <FaMapMarkerAlt className="text-blue-500 mr-2" />
                {hospital.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedCoordinates && (
        <SideBarHospital hospitals={hospitals} searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default SearchBar;
