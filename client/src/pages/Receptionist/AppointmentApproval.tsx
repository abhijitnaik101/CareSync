import axios from "axios";
import React, { useState } from "react";
import { FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { route } from "../../../backendroute";
import { socket } from "../../socket";
import { Ticket } from "../../Types";

interface ReceptionistAppointmentApprovalProps {
  setPatientRequests: React.Dispatch<React.SetStateAction<Ticket[]>>;
  handleModal: (isOpen: boolean) => void;
  patientRequests: Ticket[];
  setRegistrations: React.Dispatch<React.SetStateAction<any>>;
}

const ReceptionistAppointmentApproval = ({
  handleModal,
  patientRequests,
  setPatientRequests,
}: ReceptionistAppointmentApprovalProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Ticket | null>(null);

  const handleApprove = async (patient: Ticket) => {
    const patients = patientRequests.filter((p) => p.id === patient.id);

    if (patients.length) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          route + `/beds/receptionist/approve/${patients[0].id}`,
          { hospitalId: patient.hospitalId },
          { headers: { Authorization: "Bearer " + token } }
        );

        setPatientRequests(patientRequests.filter((p) => p.id !== patient.id));
        socket.emit("fetch-ticket-client");
        socket.emit("sendTicketToUser", response.data);
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    }
    handleModal(false);
  };

  const handleReject = (patient: Ticket) => {
    socket.emit("reject-patient-request", patient);
    setPatientRequests(patientRequests.filter((p) => p.id !== patient.id));
    handleModal(false);
  };

  return (
    <div className="absolute inset-0 h-screen w-full bg-gray-900 bg-opacity-90 flex justify-center items-center z-50">
      <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-8 rounded-xl shadow-xl max-w-4xl w-full space-y-8">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Appointment Approval Requests
        </h2>

        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-red-400 transition"
          onClick={() => handleModal(false)}
          aria-label="Close Modal"
        >
          <FaTimes size={24} />
        </button>

        {/* Table to display patient requests */}
        <div className="h-56 overflow-y-scroll">
          <table className="min-w-full text-gray-200">
            <thead>
              <tr className="bg-gray-700 bg-opacity-50 text-left font-semibold">
                <th className="py-2 px-4">Patient Name</th>
                <th className="py-2 px-4">Appointment Type</th>
                <th className="py-2 px-4">Appointment Date</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patientRequests.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-600">
                  <td className="py-3 px-4">{patient.name}</td>
                  <td className="py-3 px-4">{patient.appointType}</td>
                  <td className="py-3 px-4">{patient.appointmentDate}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md transition"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* If a patient is selected, show their details */}
        {selectedPatient && (
          <div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              Patient Details
            </h3>
            <div className="mt-4 space-y-2 text-gray-300">
              <p>
                <span className="font-medium text-gray-400">Name:</span>{" "}
                {selectedPatient.name}
              </p>
              <p>
                <span className="font-medium text-gray-400">Age:</span>{" "}
                {selectedPatient.age}
              </p>
              <p>
                <span className="font-medium text-gray-400">Gender:</span>{" "}
                {selectedPatient.gender}
              </p>
              <p>
                <span className="font-medium text-gray-400">
                  Appointment Type:
                </span>{" "}
                {selectedPatient.appointType}
              </p>
              <p>
                <span className="font-medium text-gray-400">
                  Appointment Date:
                </span>{" "}
                {selectedPatient.appointmentDate}
              </p>
            </div>

            {/* Approve and Reject buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => handleReject(selectedPatient)}
                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition"
              >
                <FaTimesCircle />
                <span>Reject</span>
              </button>
              <button
                onClick={() => handleApprove(selectedPatient)}
                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition"
              >
                <FaCheckCircle />
                <span>Approve</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceptionistAppointmentApproval;
