import axios from "axios";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { route } from "../../../backendroute";
import { socket } from "../../socket";

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

interface ReceptionistAppointmentApprovalProps {
  handleModal: (isOpen: boolean) => void; // Function to handle modal state
}

export default function ReceptionistAppointmentApproval({
  handleModal,
}: ReceptionistAppointmentApprovalProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientRequests, setPatientRequests] = useState<Patient[]>([
    {
      id: 1,
      name: "John Doe",
      age: 30,
      gender: "Male",
      appointType: "OPD",
      doctorId: 1,
      appointmentDate: "2024-09-10",
      doctorName: "Dr. Jane Smith",
      hospitalId: 456,
    },
    {
      id: 2,
      name: "Alice Johnson",
      age: 45,
      gender: "Female",
      appointType: "Inpatient",
      doctorId: 1,
      appointmentDate: "2024-09-11",
      doctorName: "Dr. David Lee",
      hospitalId: 456,
    },
  ]);

  useEffect(() => {
    socket.on("book-appointment", (data: Patient) => {
      setPatientRequests((prevRequests) => [...prevRequests, data]);
    });
    return () => {
      socket.off("queue-update");
    };
  }, []);

  const handleApprove = async (patientId: number) => {
    const patients = patientRequests.filter((patient) => patient.id === patientId);
    if (patients.length) {
      try {
        //insert the patient details in ticket database
        const response = await axios.post(route + "/bookappointment", patients[0]);
        console.log(response.data);
        //send ticket to user
        socket.emit("sendTicketToUser", response.data);
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    }
    handleModal(false); // Close the modal after approval
  };

  const handleReject = (patientId: number) => {
    console.log("Rejected patient with ID:", patientId);
    handleModal(false); // Close the modal after rejection
  };

  return (
    <div className="absolute inset-0 h-screen w-full bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Appointment Approval Requests</h2>

        {/* Close Button */}
        <button
          className="absolute top-0 right-4 text-gray-500 hover:text-red-500"
          onClick={() => handleModal(false)}
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
            {patientRequests.map((patient) => (
              <tr key={patient.id} className="border-b">
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
              <p>
                <span className="font-medium">Name:</span> {selectedPatient.name}
              </p>
              <p>
                <span className="font-medium">Age:</span> {selectedPatient.age}
              </p>
              <p>
                <span className="font-medium">Gender:</span> {selectedPatient.gender}
              </p>
              <p>
                <span className="font-medium">Appointment Type:</span> {selectedPatient.appointType}
              </p>
              <p>
                <span className="font-medium">Appointment Date:</span> {selectedPatient.appointmentDate}
              </p>
              <p>
                <span className="font-medium">Doctor:</span> {selectedPatient.doctorName}
              </p>
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
  );
}
