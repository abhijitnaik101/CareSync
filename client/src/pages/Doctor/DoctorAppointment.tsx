import React, { useState, useEffect } from "react";
import { FaUsers, FaCalendarAlt, FaCheck, FaTrash, FaSyncAlt, FaInfoCircle } from "react-icons/fa";
import io from "socket.io-client";
import PatientModal from "./PatientModal";
import PatientTable from "./PatientTable";
import { socket } from "../../socket";
import axios from "axios";
import { route } from "../../../backendroute";

// Interface for Patient data
interface Patient {
  id: number;
  name: string;
  serial: string;
  time: string;
  gender: string;
  status: "pending" | "checked";
}


const initialPatients : Patient[] = [
  {
    id: 1,
    name: "Saswat Kumar Dash",
    serial: "20",
    time: "10:25",
    gender: "female",
    status: "pending",
  },
  {
    id: 2,
    name: "Priyanka Behera",
    serial: "21",
    time: "10:40",
    gender: "male",
    status: "pending",
  },
  {
    id: 3,
    name: "Sandeep Pradhan",
    serial: "22",
    time: "11:00",
    gender: "female",
    status: "pending",
  },
  {
    id: 4,
    name: "Rasminarjan Nayak",
    serial: "23",
    time: "11:15",
    gender: "female",
    status: "pending",
  },
  {
    id: 5,
    name: "Krishna Kumar Khuntia",
    serial: "24",
    time: "11:30",
    gender: "female",
    status: "pending",
  },
];

const DoctorsAppointment: React.FC = () => {
  const [patientQueue, setpatientQueue] = useState<Patient[]>(initialPatients);
  const [pendingPatient, setPendingPatient] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //initial fetch of queue
  useEffect(() => {
    //fetchQueue();
    //fetchPendingPatients();
  }, []);


  useState(() => {
    socket.on("doctorFetchQueue", () => {
      //fetch dat afrom queue table
      //fetchQueue();
    });
  })

  // async function fetchQueue() {
  //   try{
  //     const response = await axios.get(route + '/some-route');
  //     setpatientQueue(response.data);
  //   }
  //   catch(error){
  //     console.error(error);
  //   }
  // }

  // async function fetchPendingPatients()() {
  //   try{
  //     const response = await axios.get(route + '/some-route');
  //     setPendingPatient(response.data);
  //   }
  //   catch(error){
  //     console.error(error);
  //   }
  // }


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
      // Handle response as needed (type any for now, refine later)
    });

    return () => {
      socket.off("bed-request-response");
    };
  }, []);

  return (
    <div className="p-6 mx-auto max-w-7xl">
      {/* Top Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-500">Pending Patients</p>
            <p className="text-3xl font-bold text-blue-600">{patientQueue.length}</p>
          </div>
          <FaUsers className="text-blue-600 text-3xl" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-500">Rescheduled Appointments</p>
            <p className="text-3xl font-bold text-yellow-500">2</p>
          </div>
          <FaCalendarAlt className="text-yellow-500 text-3xl" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <p className="text-gray-500">Checked Patients</p>
            <p className="text-3xl font-bold text-green-600">{pendingPatient.length}</p>
          </div>
          <FaCheck className="text-green-600 text-3xl" />
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