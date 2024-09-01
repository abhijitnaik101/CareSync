import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

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

const NewRegistration: React.FC<NewRegistrationProps> = ({ onNewRegistration }) => {
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

    navigate("/registration");
  };

  return (
    <div className="w-full max-w-[707px] h-full max-h-[608px] mx-auto bg-white rounded-lg shadow-lg p-5 box-border">
      <div className="flex justify-end">
        <button
          className="bg-transparent border-none text-2xl cursor-pointer"
          onClick={() => navigate("/registration")}
        >
          &#x2715;
        </button>
      </div>
      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col">
          <label>Name</label>
          <input type="text" className="p-2 rounded-md border border-gray-300 text-base w-full box-border" ref={nameRef} />
        </div>
        <div className="flex justify-between">
          <div className="mb-4 flex flex-col">
            <label>Age</label>
            <input type="number" className="p-2 rounded-md border border-gray-300 text-base w-full box-border" ref={ageRef} />
          </div>
          <div className="mb-4 flex flex-col">
            <label>Gender</label>
            <select className="p-2 rounded-md border border-gray-300 text-base w-full box-border" ref={genderRef}>
              <option value="other">Other</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-4 flex flex-col">
            <label>Department</label>
            <select className="p-2 rounded-md border border-gray-300 text-base w-full box-border" ref={departmentRef}>
              <option value="ophthalmologist">Ophthalmologist</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
            </select>
          </div>
          <div className="mb-4 flex flex-col">
            <label>Visit Date</label>
            <input type="date" className="p-2 rounded-md border border-gray-300 text-base w-full box-border" ref={visitDateRef} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-4 flex flex-col">
            <label>Contact</label>
            <input type="text" className="p-2 rounded-md border border-gray-300 text-base w-full box-border" ref={contactRef} />
          </div>
          <div className="mb-4 flex flex-col">
            <label>National ID</label>
            <input type="text" className="p-2 rounded-md border border-gray-300 text-base w-full box-border" ref={nationalIdRef} />
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md cursor-pointer text-base hover:bg-blue-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default NewRegistration;
