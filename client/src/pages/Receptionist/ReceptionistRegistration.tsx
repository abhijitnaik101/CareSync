import React, { useEffect, useState } from "react";
import NewRegistration from "../../components/Receptionist/NewRegistration";
import ReceptionistRegistrationTable from "./ReceptionistRegistrationTable";
import ReceptionistRegistrationStatus from "./Status";
import ReceptionistGenderAgeDistribution from "./Distribution";
import ReceptionistTotalRegistration from "./TotalRegistration";
import ReceptionistAppointmentApproval from "./AppointmentApproval";
import { socket } from "../../socket";
import axios from "axios";
import { route } from "../../../backendroute";
import { Ticket } from "../../Types";

interface RegistrationProps {
  name: string;
  age: string;
  gender: string;
  department: string;
  visitDate: string;
  appointType: string;
  contact: string;
  visit: string;
}
[];

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  appointType: string;
  appointmentDate: string;
  doctorName: string;
  hospitalId: number;
  doctorId: number;
}

const dummyTickets: any = [
  {
    name: "John Doe",
    age: "32",
    gender: "Male",
    department: "Cardiology",
    visitDate: "2024-09-15",
    appointType: "OPD",
    contact: "123-456-7890",
    visit: "Scheduled",
  },
  {
    name: "Alice Johnson",
    age: "28",
    gender: "Female",
    department: "Neurology",
    visitDate: "2024-09-18",
    appointType: "OPD",
    contact: "987-654-3210",
    visit: "Scheduled",
  },
  {
    name: "Michael Smith",
    age: "45",
    gender: "Male",
    department: "Orthopedics",
    visitDate: "2024-09-12",
    appointType: "OPD",
    contact: "654-321-0987",
    visit: "Completed",
  },
];

const ReceptionistRegistration: React.FC<{
  registrations: RegistrationProps;
}> = ({ registrations: initialRegistrations }) => {
  const [registrations, setRegistrations] = useState(dummyTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [patientRequests, setPatientRequests] = useState<Ticket[]>([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      gender: "Male",
      appointType: "OPD",
      doctorId: 1,
      appointmentDate: "2024-09-10",
      hospitalId: 456,
      approved: false,
    },
  ]);

  const handleNewRegistrationClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  async function fetchTickets() {
    const token = localStorage.getItem("token");
    const response = await axios.get<Ticket[]>(
      route + `/booking/getappoints/1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 500 || !response) {
      console.error("Failed to fetch hospitals");
      return;
    }

    setPatientRequests(response.data.filter((p) => !p.approved));
    setRegistrations(response.data.filter((p) => p.approved));
  }

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
  }, []);

  // Listen for socket events to update patient requests
  useEffect(() => {
    socket.on("patient-request", (data: any) => {
      setPatientRequests((prevRequests) => [...prevRequests, data]);
    });

    socket.on("fetch-ticket", () => {
      fetchTickets();
    });

    return () => {
      socket.off("patient-request");
    };
  }, []);

  return (
    <div className="relative w-full bg-gray-900 text-gray-100 p-6">
      {approveModalOpen && (
        <ReceptionistAppointmentApproval
          patientRequests={patientRequests}
          setPatientRequests={setPatientRequests}
          handleModal={setApproveModalOpen}
          setRegistrations={setRegistrations}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-100">
            Receptionist Dashboard
          </h2>
          <div>
            <button
              onClick={() => setApproveModalOpen(true)}
              className="mx-2 bg-red-600 text-gray-100 px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Registration Request
            </button>
            <button
              className="mx-2 bg-blue-600 text-gray-100 px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={handleNewRegistrationClick}
            >
              + New Registration
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Registrations Card */}
          <ReceptionistTotalRegistration />

          {/* Gender and Age Distribution */}
          <ReceptionistGenderAgeDistribution />

          {/* Status Summary */}
          <ReceptionistRegistrationStatus />
        </div>

        {/* Registrations Table */}
        <ReceptionistRegistrationTable registrations={registrations} />

        {/* Modal for New Registration */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <NewRegistration closeModal={setIsModalOpen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceptionistRegistration;
