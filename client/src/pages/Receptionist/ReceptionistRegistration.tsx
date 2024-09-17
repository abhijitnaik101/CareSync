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
}[];
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
]

const ReceptionistRegistration: React.FC<{registrations: RegistrationProps}> = ({ registrations: initialRegistrations }) => {


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
      approved: false
    }
  ]);

  const handleNewRegistrationClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  async function fetchTickets() {
    const token = localStorage.getItem("token");
    const response = await axios.get<Ticket[]>(route + `/booking/getappoints/1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Response", response);
    if (response.status === 500 || !response) {
      console.error('Failed to fetch hospitals');
      return;
    }

    setPatientRequests(response.data.filter(p => p.approved == false));
    setRegistrations(response.data.filter(p => p.approved == true));
  }
  //functions to fetch hospitals data
  useEffect(() => {
    fetchTickets();
  }, [])

  useEffect(()=> {
    socket.on("patient-request", (data: any) => {
      console.log("Received patient request:", data);
      setPatientRequests((prevRequests) => [...prevRequests, data]);
    });

    socket.on('fetch-ticket', ()=>{
      fetchTickets();
    })


    return () => {
      socket.off("patient-request");
    }
  })

  return (
    <div className="relative w-full">
      {approveModalOpen &&
        <ReceptionistAppointmentApproval patientRequests={patientRequests} setPatientRequests={(value: any)=>setPatientRequests(value)} handleModal={(value: boolean)=>setApproveModalOpen(value)} setRegistrations={setRegistrations}/>
      }

      <div className="min-h-screen w-full bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Receptionist Dashboard</h2>
            <div>
              <button onClick={() => setApproveModalOpen(true)} className="mx-2 bg-red-500 border text-white px-4 py-2 rounded-md hover:bg-red-600">
                Registration Request
              </button>
              <button
                className="mx-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleNewRegistrationClick}
              >
                + New Registration
              </button>
            </div>

          </div>



          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Total Registrations Card */}
            <ReceptionistTotalRegistration/>

            {/* Gender and Age Distribution */}
            <ReceptionistGenderAgeDistribution/>

            {/* Status Summary */}
            <ReceptionistRegistrationStatus/>
          </div>



          {/* Registrations Table */}
          <ReceptionistRegistrationTable registrations={registrations}/>

          {/* API Response Display */}
          {/* {apiResponse && (
            <div className="bg-green-100 p-4 mt-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-green-800">Appointment Response</h3>
              <p>Message: {apiResponse.message}</p>
              <p>Ticket ID: {apiResponse.ticket.id}</p>
              <p>Queue Position: {apiResponse.queuePosition}</p>
            </div>
          )} */}

          {/* Modal for New Registration */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <NewRegistration closeModal={setIsModalOpen} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen , onClose , children }: { isOpen: boolean , onClose: React.MouseEventHandler<HTMLButtonElement>, children: any }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal-content">
        {children}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReceptionistRegistration;
