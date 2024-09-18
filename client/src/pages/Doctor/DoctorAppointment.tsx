import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaCheck,
  FaTrash,
  FaSyncAlt,
  FaInfoCircle,
} from "react-icons/fa";
import io from "socket.io-client";
import PatientModal from "./PatientModal";
import PatientTable, { Patient } from "./PatientTable";
import { socket } from "../../socket";
import axios from "axios";
import { route } from "../../../backendroute";

// Interface for Patient data

const DoctorsAppointment: React.FC = () => {
  const [patientQueue, setpatientQueue] = useState<Patient[]>([]);
  const [pendingPatient, setPendingPatient] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial fetch of queue
  useEffect(() => {
    fetchQueue();
  }, []);

  useState(() => {
    socket.on("doctorFetchQueue", () => {
      // Fetch data from queue table
      // fetchQueue();
    });
  });

  async function fetchQueue() {
    try {
      const date = "2024-09-19";
      const response = await axios.get(
        route + `/queuing/queues/doctor/1?hospitalId=1&appointmentDate=${date}`
      );
      console.log(response.data);
      setpatientQueue(
        response.data.map((queue: any) => ({
          id: queue.ticket.id,
          name: queue.ticket.name,
          serial: queue.position,
          gender: queue.ticket.gender,
          status: queue.ticket.approved,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }

  // Handle marking patient as done
  const handleDone = (id: number) => {
    const patient = patientQueue.find((p) => p.id === id);
    if (patient) {
      setPendingPatient([...pendingPatient, patient]);
      setpatientQueue(patientQueue.filter((p) => p.id !== id));
    }
  };

  // Handle marking patient as pending (move to pending list)
  const handlePending = (id: number) => {
    const patient = pendingPatient.find((p) => p.id === id);
    if (patient) {
      setpatientQueue([...patientQueue, { ...patient, status: "pending" }]);
      setPendingPatient(pendingPatient.filter((p) => p.id !== id));
    }
  };

  // Handle deleting patient
  const handleDelete = (id: number) => {
    setpatientQueue(patientQueue.filter((p) => p.id !== id));
    setPendingPatient(pendingPatient.filter((p) => p.id !== id));
  };

  // Handle opening modal
  const openModal = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  // Listen for socket events
  useEffect(() => {
    socket.on("bed-request-response", (data: any) => {
      console.log("Bed Request Response:", data);
    });

    return () => {
      socket.off("bed-request-response");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Top Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-300">Pending Patients</p>
            <p className="text-4xl font-extrabold">{patientQueue.length}</p>
          </div>
          <FaUsers className="text-4xl text-white" />
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-300">Rescheduled Appointments</p>
            <p className="text-4xl font-extrabold">2</p>
          </div>
          <FaCalendarAlt className="text-4xl text-white" />
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-300">Checked Patients</p>
            <p className="text-4xl font-extrabold">{pendingPatient.length}</p>
          </div>
          <FaCheck className="text-4xl text-white" />
        </div>
      </div>

      {/* Pending Patients Table */}
      <PatientTable
        title="Pending Patients"
        headerColor="blue"
        patients={patientQueue}
        onDelete={handleDelete}
        onDone={handleDone}
        onDetails={openModal}
        actionButtons={[
          { icon: <FaCheck />, action: "done", color: "green" },
          { icon: <FaTrash />, action: "delete", color: "red" },
        ]}
      />

      {/* Checked Patients Table */}
      <PatientTable
        title="Checked Patients"
        headerColor="red"
        patients={pendingPatient}
        onDelete={handleDelete}
        onPending={handlePending}
        onDetails={openModal}
        actionButtons={[
          { icon: <FaSyncAlt />, action: "pending", color: "yellow" },
          { icon: <FaTrash />, action: "delete", color: "red" },
        ]}
      />

      {/* Patient Details Modal */}
      {isModalOpen && selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          closeModal={closeModal}
          socket={socket}
        />
      )}
    </div>
  );
};

export default DoctorsAppointment;
