import React, { useState } from 'react';
import { FaCalendarAlt, FaEnvelope, FaHeartbeat, FaLock, FaPhone, FaUser, FaEdit, FaPhoneAlt, FaTint, FaUserCircle } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import patientState from '../../recoil/atoms/patientAtom';

// Interface for Patient Profile
interface Patient {
  name: string;
  email: string;
  age: number;
  bloodtype?: string;
  contact: string;
  password: string;
  profilePicture?: string;
}

// Dummy initial patient data
const initialPatientData: Patient = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 35,
  bloodtype: 'O+',
  contact: '123-456-7890',
  password: 'password123',
  profilePicture: '', // Will be updated after upload
};

const PatientForm: React.FC = () => {
  const [patient, setPatient] = useRecoilState<Patient>(patientState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatient((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!patient.name || !patient.email || !patient.age || !patient.contact || !patient.password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setPatient({
      ...patient,
      name: patient.name,
      email: patient.email,
      age: patient.age,
      bloodtype: patient.bloodtype,
      contact: patient.contact,
      password: patient.password,
      profilePicture: patient.profilePicture,
    });

    setErrorMessage(null);
    setIsEditing(false); // Stop editing on submit
    console.log('Patient Data Submitted:', patient);
  };

  return (
    <div className="p-10 h-screen border-l-2 border-white bg-gray-900 text-gray-300">
      <h2 className="text-3xl font-semibold text-gray-200 mb-8 text-center">Patient Profile</h2>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src={profileImage || "https://via.placeholder.com/150"} // Default or uploaded profile picture
            alt="Profile"
            className="rounded-full h-32 w-32 object-cover"
          />
          <label htmlFor="profilePictureUpload" className="absolute bottom-0 right-0 bg-gray-700 rounded-full p-2 cursor-pointer">
            <FaEdit className="text-gray-300" />
          </label>
          <input
            id="profilePictureUpload"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-3 text-red-500 bg-red-200 rounded-md text-center">
          {errorMessage}
        </div>
      )}

      {/* Display Patient Details or Form */}
      {!isEditing ? (
        <div className="patient-profile px-8 py-6 rounded-lg shadow-lg bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-200">Patient Profile</h2>
            <FaEdit className="text-gray-400 cursor-pointer hover:text-indigo-500" onClick={() => setIsEditing(true)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaUserCircle className="text-indigo-500 mr-4 text-2xl" />
              <div>
                <h3 className="text-lg font-medium text-gray-200">Name:</h3>
                <p className="text-gray-400">{patient.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-pink-500 mr-4 text-2xl" />
              <div>
                <h3 className="text-lg font-medium text-gray-200">Email:</h3>
                <p className="text-gray-400">{patient.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-500 mr-4 text-2xl" />
              <div>
                <h3 className="text-lg font-medium text-gray-200">Age:</h3>
                <p className="text-gray-400">{patient.age}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaTint className="text-rose-500 mr-4 text-2xl" />
              <div>
                <h3 className="text-lg font-medium text-gray-200">Blood Type:</h3>
                <p className="text-gray-400">{patient.bloodtype || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="text-blue-500 mr-4 text-2xl" />
              <div>
                <h3 className="text-lg font-medium text-gray-200">Contact:</h3>
                <p className="text-gray-400">{patient.contact}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-500" />
              <div className="flex-1">
                <label className="font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={patient.name}
                  onChange={handleInputChange}
                  className="mt-1 p-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-500" />
              <div className="flex-1">
                <label className="font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={patient.email}
                  onChange={handleInputChange}
                  className="mt-1 p-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Age */}
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-500" />
              <div className="flex-1">
                <label className="font-medium text-gray-300">Age</label>
                <input
                  type="number"
                  name="age"
                  value={patient.age}
                  onChange={handleInputChange}
                  className="mt-1 p-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
                  placeholder="Enter your age"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Blood Type */}
            <div className="flex items-center space-x-2">
              <FaHeartbeat className="text-gray-500" />
              <div className="flex-1">
                <label className="font-medium text-gray-300">Blood Type</label>
                <select
                  name="bloodtype"
                  value={patient.bloodtype}
                  onChange={handleInputChange}
                  className="mt-1 p-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
                >
                  <option value="" disabled>Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-500" />
              <div className="flex-1">
                <label className="font-medium text-gray-300">Contact</label>
                <input
                  type="tel"
                  name="contact"
                  value={patient.contact}
                  onChange={handleInputChange}
                  className="mt-1 p-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
                  placeholder="Enter your contact number"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center space-x-2">
              <FaLock className="text-gray-500" />
              <div className="flex-1">
                <label className="font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={patient.password}
                  onChange={handleInputChange}
                  className="mt-1 p-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-center mt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-gray-100 font-medium rounded-lg shadow-lg transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PatientForm;
