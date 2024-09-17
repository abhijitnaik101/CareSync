// src/components/SearchBox.tsx
import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { route } from '../../../backendroute';
import SideBarHospital from './SideBarHospital';

// Define interfaces based on the new data format
interface Doctor {
  id: number;
  name: string;
  averageTreatmentTime: number;
}

interface Department {
  id: number;
  name: string;
  hospitalId: number;
  doctors: Doctor[];
}

interface Hospital {
  id: number;
  name: string;
  coordinates: [string, string];
  services: string[];
  departments: Department[];
}

const SearchBox: React.FC<{ coordsCallback: (coords: number[] | null) => void }> = ({ coordsCallback }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Hospital[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<number[] | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch hospitals data from backend
  async function fetchHospitals() {
    try {
      const response = await axios.get(route + '/hospitals');
      setHospitals(response.data);
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentSearch(event.target.value);
    setShowSuggestions(event.target.value.length > 0);
  };

  const filteredHospitals = hospitals
    .map(hospital => ({
      ...hospital,
      departments: hospital.departments.filter(department =>
        department.name.toLowerCase().includes(departmentSearch.toLowerCase())
      ),
    }))
    .filter(hospital => hospital.departments.length > 0);

  const handleSelectSuggestion = (hospital: Hospital) => {
    setSearchTerm(hospital.name);
    setSelectedCoordinates(hospital.coordinates.reverse().map(Number) as number[]);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="absolute top-0 left-0 ml-6 w-full mx-auto mt-8 flex items-center justify-center z-10">
        <div className="mr-2 w-96">
          <div className="flex items-center border border-gray-300 rounded-md shadow-sm bg-indigo-500">
            <FaSearch className="mx-3 text-white" />
            <input
              type="text"
              value={departmentSearch}
              onChange={handleSearch}
              placeholder="Search by department (e.g., Surgery, Emergency)"
              className="w-full p-2 pl-10 border-none rounded-l-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Dropdown suggestions */}
          {showSuggestions && (
            <div className="relative w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map(hospital => (
                  <div
                    key={hospital.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <h2 className="text-lg font-semibold">{hospital.name}</h2>
                    <ul className="pl-4 mt-1">
                      {hospital.departments.map(department => (
                        <li key={department.id} className="text-gray-700">
                          <div className="font-medium">
                            Department: {department.name}
                          </div>
                          <div className="text-sm">
                            Doctors: {department.doctors.map(doc => doc.name).join(', ')}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="p-2 text-gray-600">No hospitals found for this department.</p>
              )}
            </div>
          )}
        </div>

        <div className='ml-2 w-96'>
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
            <ul className="relative z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
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
      </div>
      {selectedCoordinates && (
        <SideBarHospital hospitals={hospitals} searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default SearchBox;
