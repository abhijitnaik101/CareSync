// src/components/SearchBox.tsx
import React, { useEffect, useState } from 'react';
import { bhubaneswarHospitals } from '../../DB/HospitalLocations';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { doctorsDB } from '../../DB/Doctors';
import HospitalsComponent from './HospitalModal';

interface Hospital {
  id: number;
  name: string;
  coordinates: [number, number];
  departments: {
    department: string;
    doctors: number[];
  }[];
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

const hospitals: Hospital[] = bhubaneswarHospitals;
const doctors: Doctor[] = doctorsDB;

const SearchBox: React.FC<{ coordsCallback: (coords: [number, number] | null) => void }> = ({ coordsCallback }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Hospital[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null);

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

  //functions to fetch hospitals data
  useEffect(() => {
    fetchHospitals();
  }, [])
  //const [hospitalls,setHospitalls] = useState<Hospital[]>([]);
  async function fetchHospitals() {
    try {
      const response = await fetch('/hospitals', {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch hospitals');
      }
  
      const data = await response.json();
  
      // Basic validation to ensure data is an array of objects
      if (!Array.isArray(data) || data.some(item => typeof item !== 'object')) {
        throw new Error('Invalid response format');
      }
  
      console.log("Hospitals : ", data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      throw error;
    }
  }




  return (
    <div>
    <div className="absolute top-0 left-0 ml-6 w-full max-w-md mx-auto mt-8">
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
              key={hospital.hospital_id}
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
        <HospitalsComponent hospitals={hospitals} doctors={doctors} searchTerm={searchTerm}/>
      )}
    </div>
  );
};

export default SearchBox;
