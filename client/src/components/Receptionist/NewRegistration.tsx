import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { route } from "../../../backendroute";
import { socket } from "../../socket";

interface AppointmentDetails {
  name: string;
  age: number;
  gender: string;
  appointType: string;
  appointmentDate: string;
  hospitalId: number;
  doctorId: number;
}

interface NewRegistrationProps {
  closeModal: (isOpen: boolean) => void;
}

const NewRegistration: React.FC<NewRegistrationProps> = ({ closeModal }) => {
  const navigate = useNavigate();

  // State to hold the appointment details
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
    name: "",
    age: 10,
    gender: "other",
    appointType: "OPD",
    appointmentDate: "",
    hospitalId: 1,
    doctorId: 1,
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = new Date(e.target.value);
  //   setAppointmentDetails((prevDetails) => ({
  //    ...prevDetails,
  //     appointmentDate: value,
  //   }));
  // }

  

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // POST request to submit appointment details
      await axios.post(route + "/booking/create/appoint", appointmentDetails);
      if (appointmentDetails.appointType === 'OPD'){
        socket.emit('doctorFetchQueue');
      }
      
      // Navigate to dashboard or any other page after successful booking
      navigate("/receptionist/dashboard");
      
      // Close modal after submission
      closeModal(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="w-full max-w-[700px] h-max max-h-[600px] mx-auto bg-white rounded-xl shadow-2xl p-6 box-border relative">
      {/* Close Button */}
      <div className="flex justify-end">
        <button
          className="bg-transparent border-none text-gray-500 text-2xl cursor-pointer hover:text-gray-900 transition-all"
          onClick={() => closeModal(false)}
          aria-label="Close Modal"
        >
          <FaTimes />
        </button>
      </div>

      {/* Modal Content */}
      <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
        {/* <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Patient ID</label>
          <input
            type="number"
            name="id"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base w-full"
            value={appointmentDetails.id}
            onChange={handleInputChange}
            placeholder="Enter patient ID"
          />
        </div> */}

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base w-full"
            value={appointmentDetails.name}
            onChange={handleInputChange}
            placeholder="Enter patient's name"
          />
        </div>

        <div className="flex space-x-4">
          {/* <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              value={appointmentDetails.age}
              onChange={handleInputChange}
              placeholder="Enter age"
            />
          </div> */}

          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Gender</label>
            <select
              name="gender"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              value={appointmentDetails.gender}
              onChange={handleInputChange}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="TRANS">Other</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Appointment Type</label>
            <input
              type="text"
              name="appointType"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              value={appointmentDetails.appointType}
              onChange={handleInputChange}
              placeholder="Enter appointment type"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Appointment Date</label>
            <input
              type="date"
              name="appointmentDate"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              value={appointmentDetails.appointmentDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          {/* <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Doctor Name</label>
            <input
              type="text"
              name="doctorName"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              value={appointmentDetails.doctorName}
              onChange={handleInputChange}
              placeholder="Enter doctor's name"
            />
          </div> */}

          {/* <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Hospital ID</label>
            <input
              type="number"
              name="hospitalId"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              value={appointmentDetails.hospitalId}
              onChange={handleInputChange}
              placeholder="Enter hospital ID"
            />
          </div>
        </div> */}

        {/* <div className="flex space-x-4">
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Doctor ID</label>
            <input
              type="number"
              name="doctorId"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              value={appointmentDetails.doctorId}
              onChange={handleInputChange}
              placeholder="Enter doctor ID"
            />
          </div>*/}
        </div> 

        <div className="flex justify-center">
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition-all"
          >
            Register Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRegistration;
