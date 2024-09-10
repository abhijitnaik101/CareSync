import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import axios from "axios";
import { route } from "../../../backendroute";

interface NewRegistrationProps {
  onNewRegistration: (formData: {
    name: string;
    age: string;
    gender: string;
    department: string;
    visitDate: string;
    contact: string;
    nationalId: string;
  }) => void;
}

const NewRegistration: React.FC<NewRegistrationProps> = ({ onNewRegistration,  closeModal }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);
  const visitDateRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const nationalIdRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value || "",
      age: ageRef.current?.value || "",
      gender: genderRef.current?.value || "other",
      department: departmentRef.current?.value || "ophthalmologist",
      visitDate: visitDateRef.current?.value || "",
      contact: contactRef.current?.value || "",
      nationalId: nationalIdRef.current?.value || "",
    };

    console.log("Form Data Submitted:", formData);
    onNewRegistration(formData);

    navigate("/receptionist/dashboard");
  };

  const bookAppointment = async () => {
    const requestData = {
      name: "John Doe",
      age: 35,
      gender: "male",
      appointType: "OPD",
      patientId: 123,
      doctorId: 1,
      hospitalId: 456,
      appointmentDate: "2024-09-20T10:00:00"
    };
  
    try {
      const response = await axios.post(route + '/bookappointment', requestData);
      console.log(response.data);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };
  
  bookAppointment();

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
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Name</label>
          <input
            type="text"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base w-full"
            ref={nameRef}
            placeholder="Enter patient's name"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Age</label>
            <input
              type="number"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              ref={ageRef}
              placeholder="Enter age"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Gender</label>
            <select
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              ref={genderRef}
            >
              <option value="other">Other</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Department</label>
            <select
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              ref={departmentRef}
            >
              <option value="ophthalmologist">Ophthalmologist</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Visit Date</label>
            <input
              type="date"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              ref={visitDateRef}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">Contact</label>
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              ref={contactRef}
              placeholder="Enter contact number"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="font-semibold text-gray-700">National ID</label>
            <input
              type="text"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-base"
              ref={nationalIdRef}
              placeholder="Enter national ID"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={bookAppointment}
            type="submit"
            className="py-3 px-6 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition-all"
          >
            Register
          </button>
        </div>
      </form>
    </div>

  );
};

export default NewRegistration;
