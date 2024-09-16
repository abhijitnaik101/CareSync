// src/components/SearchBox.tsx
import React, { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { doctorsDB } from '../../DB/Doctors';
import axios from 'axios';
import { route } from '../../../backendroute';
import { bhubaneswarHospitals } from '../../DB/HospitalLocations';
import SideBarHospital from './SideBarHospital';

interface Hospital {
  hospital_id: number;
  name: string;
  coordinates: [number, number];
  departments: Department[];
}

interface Department {
  department: string;
  doctors: number[];
}

interface Doctor {
  doctor_id: number;
  specialization: string;
  expected_waiting_time: string;
  working_days: string[];
  working_hours: string;
  experience: string;
  availability: string;
}

const doctors: Doctor[] = doctorsDB;

const SearchBox: React.FC<{ coordsCallback: (coords: number[] | null) => void }> = ({ coordsCallback }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Hospital[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<number[] | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>(bhubaneswarHospitals);

  const [departmentSearch, setDepartmentSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentSearch(event.target.value);
    setShowSuggestions(event.target.value.length > 0);
  };

  const filteredHospitals = bhubaneswarHospitals
    .map(hospital => ({
      ...hospital,
      departments: hospital.departments.filter(department =>
        department.department.toLowerCase().includes(departmentSearch.toLowerCase())
      ),
    }))
    .filter(hospital => hospital.departments.length > 0);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: '',
    age: '',
    gender: '',
    appointType: '',
    patientId: '',
    doctorId: '',
    hospitalId: '',
    appointmentDate: '',
  });

  async function fetchHospitals() {
    const response = await axios.get(route + '/hospitals');
    console.log("Response", response);
    if (response.status === 500 || !response) {
      console.error('Failed to fetch hospitals');
      return;
    }
  
    setHospitals(response.data);
  }
  //functions to fetch hospitals data
  useEffect(() => {
    //fetchHospitals();
  }, [])



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
    <div>
    <div className="absolute top-0 left-0 ml-6 w-full max-w-md mx-auto mt-8">

    
      <div className="max-w-md mx-auto ">
        <h1 className="text-lg font-bold mb-4">Search Hospitals by Department</h1>
       
        <input
          type="text"
          value={departmentSearch}
          onChange={handleSearch}
          placeholder="Search by department (e.g., Surgery, Emergency)"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Dropdown suggestions */}
        {showSuggestions && (
          <div className= "absolute w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map(hospital => (
                <div
                  key={hospital.hospital_id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <h2 className="text-lg font-semibold">{hospital.name}</h2>
                  <ul className="pl-4 mt-1">
                    {hospital.departments.map(department => (
                      <li key={department.department} className="text-gray-700">
                        <div className="font-medium">
                          Department: {department.department}
                        </div>
                        <div className="text-sm">
                          Doctors: {department.doctors.join(', ')}
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
        <SideBarHospital hospitals={hospitals} doctors={doctors} searchTerm={searchTerm}/>
      )}
    </div>
  );
};

export default SearchBox;
