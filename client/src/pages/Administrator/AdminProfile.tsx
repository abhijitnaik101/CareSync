import React, { useState } from "react";
import {
  FaUserEdit,
  FaSave,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaUserTie,
  FaBirthdayCake,
  FaTransgender,
  FaFlag,
  FaBriefcase,
  FaMedal,
  FaLightbulb,
} from "react-icons/fa";

const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Dr. John Doe",
    title: "Chief Administrator",
    dob: "January 1, 1980",
    gender: "Male",
    nationality: "American",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    office: "Room 101, Administration Building",
    roles: ["Hospital Management", "Policy Development", "Staff Coordination"],
    experience: [
      "10 years in hospital administration",
      "5 years as department head",
    ],
    qualifications: ["MD in Internal Medicine", "MBA in Healthcare Management"],
    expertise: [
      "Hospital Management",
      "Policy Development",
      "Staff Coordination",
    ],
  });

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleListChange = (
    listName: keyof typeof formData,
    index: number,
    value: string
  ) => {
    const updatedList = [...formData[listName]];
    updatedList[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      [listName]: updatedList,
    }));
  };

  const handleSave = () => setIsEditing(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6">
      <div className="w-full mx-auto bg-gray-900 bg-opacity-80 rounded-lg shadow-2xl">
        <div className="p-6 border-b border-gray-600 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
          <button
            onClick={isEditing ? handleSave : handleEditClick}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            {isEditing ? (
              <>
                <FaSave className="inline mr-2" /> Save
              </>
            ) : (
              <>
                <FaUserEdit className="inline mr-2" /> Edit
              </>
            )}
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="flex items-center space-x-6 mb-8">
            <img
              src="https://media.istockphoto.com/id/1311511363/photo/headshot-portrait-of-smiling-male-doctor-with-tablet.jpg?s=612x612&w=0&k=20&c=w5TecWtlA_ZHRpfGh20II-nq5AvnhpFu6BfOfMHuLMA="
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <div>
              <div className="mb-4">
                <label className="block text-lg text-gray-300">Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange(e, "name")}
                    className="text-2xl font-semibold text-white bg-gray-800 border border-gray-700 rounded-lg p-2 w-full"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold">{formData.name}</h2>
                )}
              </div>
              <div>
                <label className="block text-lg text-gray-300">Title:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange(e, "title")}
                    className="text-white bg-gray-800 border border-gray-700 rounded-lg p-2 w-full"
                  />
                ) : (
                  <p className="text-white">{formData.title}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`bg-gray-800 p-6 rounded-lg shadow-md ${
                isEditing ? "ring-2 ring-blue-400" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Personal Information
              </h3>
              {isEditing ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-300">
                      Date of Birth:
                    </label>
                    <input
                      type="text"
                      value={formData.dob}
                      onChange={(e) => handleChange(e, "dob")}
                      className="bg-gray-700 border border-gray-600 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300">Gender:</label>
                    <input
                      type="text"
                      value={formData.gender}
                      onChange={(e) => handleChange(e, "gender")}
                      className="bg-gray-700 border border-gray-600 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300">Nationality:</label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => handleChange(e, "nationality")}
                      className="bg-gray-700 border border-gray-600 rounded-lg p-2 w-full"
                    />
                  </div>
                </>
              ) : (
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <FaBirthdayCake className="inline mr-2" /> {formData.dob}
                  </li>
                  <li>
                    <FaTransgender className="inline mr-2" /> {formData.gender}
                  </li>
                  <li>
                    <FaFlag className="inline mr-2" /> {formData.nationality}
                  </li>
                </ul>
              )}
            </div>

            <div
              className={`bg-gray-800 p-6 rounded-lg shadow-md ${
                isEditing ? "ring-2 ring-blue-400" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Contact Details
              </h3>
              {isEditing ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-300">Email:</label>
                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) => handleChange(e, "email")}
                      className="bg-gray-700 border border-gray-600 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300">Phone:</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleChange(e, "phone")}
                      className="bg-gray-700 border border-gray-600 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300">Office:</label>
                    <input
                      type="text"
                      value={formData.office}
                      onChange={(e) => handleChange(e, "office")}
                      className="bg-gray-700 border border-gray-600 rounded-lg p-2 w-full"
                    />
                  </div>
                </>
              ) : (
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <FaEnvelope className="inline mr-2" /> {formData.email}
                  </li>
                  <li>
                    <FaPhone className="inline mr-2" /> {formData.phone}
                  </li>
                  <li>
                    <FaBuilding className="inline mr-2" /> {formData.office}
                  </li>
                </ul>
              )}
            </div>

            <div
              className={`bg-gray-800 p-6 rounded-lg shadow-md ${
                isEditing ? "ring-2 ring-blue-400" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Administrative Roles
              </h3>
              {isEditing ? (
                formData.roles.map((role, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      value={role}
                      onChange={(e) =>
                        handleListChange("roles", index, e.target.value)
                      }
                      className="bg-gray-700 border border-gray-600 rounded-lg p-2 w-full"
                    />
                  </div>
                ))
              ) : (
                <ul className="space-y-3 text-gray-400">
                  {formData.roles.map((role, index) => (
                    <li key={index}>
                      <FaUserTie className="inline mr-2" /> {role}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div
              className={`bg-gray-800 p-6 rounded-lg shadow-md ${
                isEditing ? "ring-2 ring-blue-400" : ""
              }`}
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">
                Experience
              </h3>
              {isEditing ? (
                formData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      value={exp}
                      onChange={(e) =>
                        handleListChange("experience", index, e.target.value)
                      }
                      className="bg-gray-700 border border-gray-600 rounded-lg p-2 w-full"
                    />
                  </div>
                ))
              ) : (
                <ul className="space-y-3 text-gray-400">
                  {formData.experience.map((exp, index) => (
                    <li key={index}>
                      <FaBriefcase className="inline mr-2" /> {exp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
