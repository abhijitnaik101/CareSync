import React from "react";
import { FaTimes, FaBed } from "react-icons/fa";
import { Socket } from "socket.io-client";
import axios from "axios";
import { route } from "../../../backendroute";

interface Patient {
  id: number;
  name: string;
  serial: string;
  gender: string;
  status: string;
}

interface Props {
  patient: Patient;
  closeModal: () => void;
  socket: Socket;
}

const PatientModal: React.FC<Props> = ({ patient, closeModal, socket }) => {
  const handleAdmit = async () => {
    try {
      const response = await axios.put<{ticketId: number, name: string}>(route + `/queuing/queues/toipd?ticketId=${patient.id}`)
      socket.emit("bed-request", response.data);
    } catch (error) {
      console.error(error);
    }
    
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={closeModal}
          aria-label="Close Modal"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {patient.name}
          </p>
          <p>
            <strong>Serial No.:</strong> {patient.serial}
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Status:</strong> {patient.status}
          </p>
          {/* Add more patient details as needed */}
        </div>

        {/* Admit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAdmit}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FaBed className="mr-2" /> Admit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;