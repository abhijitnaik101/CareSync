// src/components/SearchBox.tsx
import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { route } from '../../../backendroute';
import SideBarHospital from './SideBarHospital';
import { Hospital } from '../../Types';

// Define interfaces based on the new data format


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
    <div className="bg-gray-900 h-max">
      <div className="absolute top-0 left-0 ml-6 w-full mx-auto mt-8 flex items-center justify-center z-10">
        {/* Department Search */}
        <div className="mr-2 w-96">
          <div className="flex items-center border border-gray-700 rounded-md shadow-lg bg-gray-800 text-white">
            <FaSearch className="mx-3 text-yellow-400" />
            <input
              type="text"
              value={departmentSearch}
              onChange={handleSearch}
              placeholder="Search by department (e.g., Surgery, Emergency)"
              className="w-full p-2 pl-10 border-none rounded-l-none rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            />
          </div>
          {/* Dropdown suggestions */}
          {showSuggestions && (
            <div className="relative w-full bg-gray-800 shadow-lg rounded-md max-h-60 overflow-y-auto mt-2">
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map(hospital => (
                  <div
                    key={hospital.id}
                    className="p-2 hover:bg-gray-700 cursor-pointer text-white"
                  >
                    <h2 className="text-lg font-semibold text-yellow-400">{hospital.name}</h2>
                    <ul className="pl-4 mt-1">
                      {hospital.departments.map(department => (
                        <li key={department.id} className="text-gray-300">
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
                <p className="p-2 text-gray-400">No hospitals found for this department.</p>
              )}
            </div>
          )}
        </div>

        {/* Hospital Search */}
        <div className='ml-2 w-96'>
          <div className="flex items-center border border-gray-700 rounded-md shadow-lg bg-gray-800 text-white">
            <FaSearch className="mx-3 text-yellow-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search for hospitals..."
              className="w-full p-2 pl-10 border-none rounded-l-none rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
            />
          </div>
          {suggestions.length > 0 && (
            <ul className="relative z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
              {suggestions.map((hospital) => (
                <li
                  key={hospital.id}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-700 text-white"
                  onClick={() => handleSelectSuggestion(hospital)}
                >
                  <FaMapMarkerAlt className="text-yellow-400 mr-2" />
                  {hospital.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Sidebar Hospital */}
      {selectedCoordinates && (
        <SideBarHospital hospitals={hospitals} searchTerm={searchTerm} />
      )}
    </div>

  );
};

export default SearchBox;
