import React, { useEffect, useState } from "react";
import { FaUser, FaVenusMars, FaCalendarAlt, FaTint, FaPhoneAlt } from "react-icons/fa";
import { FaBed, FaUserMd, FaTimes, FaUserPlus, FaClipboardList } from "react-icons/fa";
import axios from "axios";
import { dummyPatients } from "../../DB/Patient";
import { socket } from "../../socket";
import AdmitModal from "./AdmitModal";
import RequestModal from "./RequestModal";


// Interfaces
interface Patient {
  id: number;
  name: string;
  bed: number;
  gender: string;
  age: number;
  email: string;
  bloodtype?: string;
  contact: string;
  appointType: string;
  status: "Occupied" | "Billing";
  appointmentDate: Date;
}

interface Ward {
  id: number;
  name: string;
  patients: Patient[];
}

// Sample wards data
const initialWards: Ward[] = dummyPatients;


// Modal component for admitting new patient

// PatientRow Component for displaying individual patient details
const PatientRow: React.FC<{ patient: Patient; onDischarge: () => void; onDetails: () => void }> = ({
  patient,
  onDischarge,
  onDetails,
}) => {
  return (
    <tr className="hover:bg-gray-700 transition">
      <td className="px-4 py-4 text-white">{patient.name}</td>
      <td className="px-4 py-4 text-white">{patient.bed}</td>
      <td className="px-4 py-4 text-white">{patient.gender}</td>
      <td className="px-4 py-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${patient.status === "Occupied" ? "bg-red-600" : "bg-green-600"} text-white`}>
          {patient.status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <button onClick={onDetails} className="text-blue-400 hover:text-blue-600 font-medium transition">
            Details
          </button>
          <button onClick={onDischarge} className="text-red-400 hover:text-red-600 font-medium transition">
            Discharge
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main AdministratorWard Component
const AdministratorWard: React.FC = () => {
  const [wards, setWards] = useState<Ward[]>(initialWards);
  const [selectedWard, setSelectedWard] = useState<number>(1);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  const [socketPatient, setSocketPatient] = useState<Patient | null>(null);

  useEffect(() => {
    socket.on('admit-request-response', (data: Patient) => {
      console.log("admin admit patient modal", data);
      setSocketPatient(data);
    });

    return () => {
      socket.off('admit-patient-response');
    };
  }, []);

  const handleAdmitPatient = (newPatient: Patient) => {
    setWards((prevWards) =>
      prevWards.map((ward) =>
        ward.id === selectedWard ? { ...ward, patients: [...ward.patients, newPatient] } : ward
      )
    );
  };

  const handleDischargePatient = (patientId: number) => {
    setWards((prevWards) =>
      prevWards.map((ward) =>
        ward.id === selectedWard
          ? { ...ward, patients: ward.patients.filter((p) => p.id !== patientId) }
          : ward
      )
    );
  };

  const handleShowDetails = (patient: Patient) => {
    setCurrentPatient(patient);
  };

  return (
    <div className="bg-gray-800 text-white h-full shadow-lg p-8">
      <h1 className="text-4xl font-bold mb-6">Ward Management</h1>

      {/* Ward Selector */}
      <div className="flex items-center space-x-4 mb-6">
        <label className="text-lg font-medium">Wards</label>
        <select
          value={selectedWard}
          onChange={(e) => setSelectedWard(Number(e.target.value))}
          className="p-2 rounded bg-gray-700 focus:ring-2 focus:ring-purple-500"
        >
          {wards.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowAdmitModal(true)}
          className="ml-auto px-4 py-2 bg-purple-600 text-white flex items-center rounded-lg hover:bg-purple-700 transition"
        >
          <FaUserPlus className="mr-2" />
          Admit Patient
        </button>

        <button
          onClick={() => setShowRequestModal(true)}
          className="ml-auto px-4 py-2 bg-purple-600 text-white flex items-center rounded-lg hover:bg-purple-700 transition"
        >
          <FaUserPlus className="mr-2" />
          Admit Patient
        </button>
      </div>

      {/* Patient Table */}
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-purple-400 border-b border-gray-700">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Bed</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wards
            .find((ward) => ward.id === selectedWard)
            ?.patients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                onDischarge={() => handleDischargePatient(patient.id)}
                onDetails={() => handleShowDetails(patient)}
              />
            ))}
        </tbody>
      </table>

      {/* Admit Modal */}
      {showAdmitModal && <AdmitModal onClose={() => setShowAdmitModal(false)} onSave={handleAdmitPatient} selectedWardId={selectedWard} wards={wards} />}
      {/* Admit Modal */}
      {showRequestModal && <RequestModal onClose={() => setShowRequestModal(false)} patient={socketPatient} onSave={handleAdmitPatient} selectedWardId={selectedWard} wards={wards} />}

      {/* Patient Details Modal */}
      {currentPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white w-96 p-8 rounded-xl shadow-xl transform transition-all duration-500 ease-in-out">
          {/* Modal Header */}
          <h2 className="text-3xl font-semibold mb-6 flex items-center">
            <FaUser className="mr-3 text-gray-700" />
            Patient Details
          </h2>
  
          {/* Patient Info */}
          <div className="space-y-4 text-md font-normal">
            <p className="flex items-center">
              <FaUser className="mr-2 text-pink-500" />
              <span className="font-semibold text-gray-300">Name : </span> {currentPatient.name}
            </p>
  
            <p className="flex items-center">
              <FaBed className="mr-2 text-green-500" />
              <span className="font-semibold text-gray-300">Bed : </span> {currentPatient.bed}
            </p>
  
            <p className="flex items-center">
              <FaVenusMars className="mr-2 text-blue-400" />
              <span className="font-semibold text-gray-300">Gender : </span> {currentPatient.gender}
            </p>
  
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 text-orange-400" />
              <span className="font-semibold text-gray-300">Age : </span> {currentPatient.age}
            </p>
  
            <p className="flex items-center">
              <FaTint className="mr-2 text-red-500" />
              <span className="font-semibold text-gray-300">Blood Type : </span> {currentPatient.bloodtype}
            </p>
  
            <p className="flex items-center">
              <FaPhoneAlt className="mr-2 text-yellow-500" />
              <span className="font-semibold text-gray-300">Contact : </span> {currentPatient.contact}
            </p>
  
            <p className="flex items-center">
              <span className="font-semibold text-gray-300">Status : </span>
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                currentPatient.status === "Occupied" ? "bg-red-700" : "bg-green-700"
              }`}>
                {currentPatient.status}
              </span>
            </p>
          </div>
  
          {/* Modal Actions */}
          <div className="flex justify-end mt-8">
            <button
              onClick={() => setCurrentPatient(null)}
              className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-600 text-white rounded-md shadow-lg hover:from-red-600 hover:to-red-500 transition ease-in-out duration-300 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default AdministratorWard;
