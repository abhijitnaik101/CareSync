import React, { useState } from "react";

const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false); // Default state is not editable
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

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

const handleListChange = (listName: keyof typeof formData, index: number, value: string) => {
    const updatedList = [...formData[listName]];
    updatedList[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      [listName]: updatedList,
    }));
  };

  const handleSave = () => {
    // Save data to the server or update state here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full mx-auto bg-white rounded-lg shadow-2xl">
        <div className="p-6 border-b border-gray-300 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-900">Admin Profile</h1>
          <button
            onClick={isEditing ? handleSave : handleEditClick}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <div className="p-6 space-y-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8">
            <img
              src="/path/to/profile-picture.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            <div>
              <div className="mb-4">
                <label
                  className={`block text-gray-700 text-lg ${
                    isEditing ? "font-semibold" : ""
                  }`}
                >
                  Name:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange(e, "name")}
                    className="text-2xl font-semibold text-gray-900 bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {formData.name}
                  </h2>
                )}
              </div>
              <div>
                <label
                  className={`block text-gray-700 text-lg ${
                    isEditing ? "font-semibold" : ""
                  }`}
                >
                  Title:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange(e, "title")}
                    className="text-gray-700 bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                  />
                ) : (
                  <p className="text-gray-700">{formData.title}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className={`bg-gray-50 p-6 rounded-lg shadow-md ${isEditing ? "ring-2 ring-blue-400" : ""}`}>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Personal Information
              </h3>
              {isEditing ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">Date of Birth:</label>
                    <input
                      type="text"
                      value={formData.dob}
                      onChange={(e) => handleChange(e, "dob")}
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Gender:</label>
                    <input
                      type="text"
                      value={formData.gender}
                      onChange={(e) => handleChange(e, "gender")}
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Nationality:</label>
                    <input
                      type="text"
                      value={formData.nationality}
                      onChange={(e) => handleChange(e, "nationality")}
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                </>
              ) : (
                <ul className="space-y-3 text-gray-700">
                  <li>Date of Birth: {formData.dob}</li>
                  <li>Gender: {formData.gender}</li>
                  <li>Nationality: {formData.nationality}</li>
                </ul>
              )}
            </div>

            {/* Contact Details */}
            <div className={`bg-gray-50 p-6 rounded-lg shadow-md ${isEditing ? "ring-2 ring-blue-400" : ""}`}>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Contact Details
              </h3>
              {isEditing ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) => handleChange(e, "email")}
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Phone:</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleChange(e, "phone")}
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Office:</label>
                    <input
                      type="text"
                      value={formData.office}
                      onChange={(e) => handleChange(e, "office")}
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                </>
              ) : (
                <ul className="space-y-3 text-gray-700">
                  <li>Email: {formData.email}</li>
                  <li>Phone: {formData.phone}</li>
                  <li>Office: {formData.office}</li>
                </ul>
              )}
            </div>

            {/* Administrative Roles */}
            <div className={`bg-gray-50 p-6 rounded-lg shadow-md ${isEditing ? "ring-2 ring-blue-400" : ""}`}>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
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
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                ))
              ) : (
                <ul className="space-y-3 text-gray-700">
                  {formData.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Experience */}
            <div className={`bg-gray-50 p-6 rounded-lg shadow-md ${isEditing ? "ring-2 ring-blue-400" : ""}`}>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
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
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                ))
              ) : (
                <ul className="space-y-3 text-gray-700">
                  {formData.experience.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Qualifications */}
            <div className={`bg-gray-50 p-6 rounded-lg shadow-md ${isEditing ? "ring-2 ring-blue-400" : ""}`}>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Qualifications
              </h3>
              {isEditing ? (
                formData.qualifications.map((qual, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      value={qual}
                      onChange={(e) =>
                        handleListChange(
                          "qualifications",
                          index,
                          e.target.value
                        )
                      }
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                ))
              ) : (
                <ul className="space-y-3 text-gray-700">
                  {formData.qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Expertise */}
            <div className={`bg-gray-50 p-6 rounded-lg shadow-md ${isEditing ? "ring-2 ring-blue-400" : ""}`}>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Expertise
              </h3>
              {isEditing ? (
                formData.expertise.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      value={exp}
                      onChange={(e) =>
                        handleListChange("expertise", index, e.target.value)
                      }
                      className="bg-gray-100 border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                ))
              ) : (
                <ul className="space-y-3 text-gray-700">
                  {formData.expertise.map((exp, index) => (
                    <li key={index}>{exp}</li>
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
