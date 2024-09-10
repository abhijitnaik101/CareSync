import React, { useEffect, useState } from "react";
import NewRegistration from "../../components/Receptionist/NewRegistration";
import { socket } from "../../socket";
import { data } from "framer-motion/client";
import { route } from "../../../backendroute";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { FaUsers, FaMale, FaFemale, FaUserCheck, FaHourglassHalf } from "react-icons/fa";

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

const ReceptionistRegistration: React.FC<RegistrationProps> = ({ registrations: initialRegistrations }) => {


  const [registrations, setRegistrations] = useState(dummyTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null); // To store API response
  const [approveModalOpen, setApproveModalOpen] = useState(false);

  const handleNewRegistrationClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleNewRegistration = async (formData: {
    name: string;
    age: string;
    gender: string;
    department: string;
    visitDate: string;
    contact: string;
    nationalId: string;
  }) => {
    const newRegistration = {
      ...formData,
      register: "Registered",
      visit: "Scheduled",
    };

    try {
      const response = await fetch('http://your-api-url/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          gender: formData.gender.toUpperCase(),
          appointType: "OPD", // Assuming OPD for registration
          patientId: 1, // Assuming patientId for example
          doctorId: 1, // Assuming doctorId for example
          hospitalId: 1, // Assuming hospitalId for example
          appointmentDate: formData.visitDate, // Assuming visitDate as appointmentDate
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const data = await response.json();
      setApiResponse(data); // Store the API response
      setRegistrations([...registrations, newRegistration]); // Update registrations list

      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const [patientRequests, setPatientRequests] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      appointType: 'OPD',
      doctorId: 1,
      appointmentDate: '2024-09-10',
      doctorName: 'Dr. Jane Smith',
      hospitalId: 456,
    },
    {
      id: 2,
      name: 'Alice Johnson',
      age: 45,
      gender: 'Female',
      appointType: 'Inpatient',
      doctorId: 1,
      appointmentDate: '2024-09-11',
      doctorName: 'Dr. David Lee',
      hospitalId: 456,
    }
  ]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);


  const handleApprove = async (patientId: number) => {

    // Perform the approval logic, e.g., sending the request to the backend
    const patients = patientRequests.filter((patient) => patient.id === patientId);
    if (patients.length) {
      try {
        const response = await axios.post(route + '/bookappointment', patients[0]);
        console.log(response.data);
      } catch (error) {
        console.error('Error booking appointment:', error);
      }
    }
    setApproveModalOpen(false); // Close the modal after approval
  };





  // async function fetchHospitals() {
  //   const response = await axios.get(route + '/hospitals');
  //   console.log("Response", response);
  //   if (response.status === 500 || !response) {
  //     console.error('Failed to fetch hospitals');
  //     return;
  //   }

  //   setHospitals(response.data);
  // }
  // //functions to fetch hospitals data
  // useEffect(() => {
  //   fetchHospitals();
  // }, [])




  const handleReject = (patientId: number) => {
    // Perform the rejection logic, e.g., sending the request to the backend
    console.log("Rejected patient with ID:", patientId);
    setApproveModalOpen(false); // Close the modal after rejection
  };

  useEffect(() => {
    socket.on('book-appointment', (data) => {
      setPatientRequests([...patientRequests, data]);
    })
    // Clean up when component unmounts
    return () => {
      socket.off('queue-update');
    };
  }, [])

  return (
    <div className="relative w-full">
      {approveModalOpen &&
        <div className="absolute inset-0 h-screen w-full bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Appointment Approval Requests</h2>
            {/* Close Button */}
            <button
              className="absolute top-0 right-4 text-gray-500 hover:text-red-500"
              onClick={() => setApproveModalOpen(false)}
              aria-label="Close Modal"
            >

              <FaTimes size={20} />
            </button>

            {/* Table to display patient requests */}
            <table className="min-w-full bg-white border rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">Patient Name</th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">Appointment Type</th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">Appointment Date</th>
                  <th className="py-2 px-4 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Iterate through patient requests */}
                {patientRequests.map((patient, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{patient.name}</td>
                    <td className="py-3 px-4">{patient.appointType}</td>
                    <td className="py-3 px-4">{patient.appointmentDate}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* If a patient is selected, show their details */}
            {selectedPatient && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <h3 className="text-xl font-bold text-gray-800">Patient Details</h3>
                <div className="mt-4 space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedPatient.name}</p>
                  <p><span className="font-medium">Age:</span> {selectedPatient.age}</p>
                  <p><span className="font-medium">Gender:</span> {selectedPatient.gender}</p>
                  <p><span className="font-medium">Appointment Type:</span> {selectedPatient.appointType}</p>
                  <p><span className="font-medium">Appointment Date:</span> {selectedPatient.appointmentDate}</p>
                  <p><span className="font-medium">Doctor:</span> {selectedPatient.doctorName}</p>
                </div>

                {/* Approve and Reject buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => handleReject(selectedPatient.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedPatient.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Approve
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
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
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-lg shadow-lg flex items-center">
              <div className="text-white">
                <FaUsers className="text-5xl" />
              </div>
              <div className="ml-4">
                <div className="text-white font-medium text-sm uppercase tracking-wider">Total Registrations</div>
                <div className="text-white font-bold text-4xl mt-2">100</div>
                <div className="text-white opacity-75 text-sm mt-1">as of today</div>
              </div>
            </div>

            {/* Gender and Age Distribution */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg">
              <h3 className="text-white font-semibold text-lg mb-4">Gender and Age Distribution</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaMale className="text-blue-300 text-2xl" />
                  <span className="ml-2 text-white font-medium">Male</span>
                </div>
                <div className="text-white font-bold">50</div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaFemale className="text-pink-300 text-2xl" />
                  <span className="ml-2 text-white font-medium">Female</span>
                </div>
                <div className="text-white font-bold">5</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaUsers className="text-green-300 text-2xl" />
                  <span className="ml-2 text-white font-medium">Elderly</span>
                </div>
                <div className="text-white font-bold">45</div>
              </div>
            </div>

            {/* Status Summary */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg">
              <h3 className="text-white font-semibold text-lg mb-4">Registration Status</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaUserCheck className="text-green-300 text-2xl" />
                  <span className="ml-2 text-white font-medium">Approved</span>
                </div>
                <div className="text-white font-bold">50</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaHourglassHalf className="text-yellow-300 text-2xl" />
                  <span className="ml-2 text-white font-medium">Pending</span>
                </div>
                <div className="text-white font-bold">50</div>
              </div>
            </div>
          </div>



          {/* Registrations Table */}
          <div className="bg-white shadow-sm rounded-md p-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Patient</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Date</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Gender</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Contact</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Visit</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500">Type</th>
                  <th className="px-4 py-2 text-left text-white bg-indigo-500"></th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((row : RegistrationProps , index : number) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2">{row.visitDate}</td>
                    <td className="px-4 py-2">{row.gender}</td>
                    <td className="px-4 py-2">{row.contact}</td>
                    <td className="px-4 py-2">{row.visit}</td>
                    <td className="px-4 py-2">{row.appointType}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-600 hover:underline">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
              <NewRegistration onNewRegistration={handleNewRegistration} closeModal={setIsModalOpen} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen , onClose , children }) => {
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
