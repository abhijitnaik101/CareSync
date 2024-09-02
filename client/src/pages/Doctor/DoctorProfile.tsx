import React, { useState } from "react";

const DoctorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "Dr. Emma Carter",
    title: "Senior Consultant Cardiologist, HeartCare Hospital",
    phone: "5551234567",
    email: "emma.carter@heartcare.com",
    experience: "15 years",
    age: "32",
    specialization: "Cardiologist",
    qualifications: [
      "MBBS, Johns Hopkins University",
      "MD in Cardiology, Mayo Clinic",
    ],
    bio: "Dr. Emma Carter has over 15 years of experience in cardiology, specializing in the management and treatment of heart diseases. She has held leadership roles at prestigious institutions and has successfully performed over 500 complex cardiac surgeries.",
    expertise: [
      "Coronary Artery Disease",
      "Heart Failure Management",
      "Hypertension and Arrhythmia Treatment",
    ],
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setDoctorInfo({ ...doctorInfo, [field]: e.target.value });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const updatedArray = [...(doctorInfo as any)[field]];
    updatedArray[index] = e.target.value;
    setDoctorInfo({ ...doctorInfo, [field]: updatedArray });
  };

  return (
    <>
      <div className="bg-blue-500 h-[50px] p-6 mx-auto"></div>
      <div className="flex flex-col md:flex-row justify-between p-4 px-[50px] mx-auto bg-gray-200 m-[4px] rounded-[10px]">
        <button className="border-2 border-black rounded-[5px] bg-blue-500 mb-2 md:mb-0">
          Profile
        </button>
        <button className="border-2 border-black rounded-[5px] px-[35px] bg-white mb-2 md:mb-0">
          Notifications
        </button>
        <button className="border-2 border-black rounded-[5px] px-[35px] bg-white">
          Schedule
        </button>
      </div>
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6 mx-auto border mt-4">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            className="rounded-full w-32 h-32 md:w-48 md:h-48 mx-auto md:mx-0"
            src="https://via.placeholder.com/150"
            alt={doctorInfo.name}
          />
        </div>
        <div className="flex-grow md:ml-6">
          <div className="flex justify-between items-center flex-col md:flex-row">
            <h2 className="text-2xl font-semibold">
              {isEditing ? (
                <input
                  type="text"
                  value={doctorInfo.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="border p-2 rounded"
                />
              ) : (
                doctorInfo.name
              )}
            </h2>
            <button
              className="text-blue-500 hover:underline mt-2 md:mt-0"
              onClick={handleEditToggle}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <div className="text-gray-500 mt-2">
            {isEditing ? (
              <input
                type="text"
                value={doctorInfo.title}
                onChange={(e) => handleInputChange(e, "title")}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p className="text-sm">{doctorInfo.title}</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row ">
            <div className="mt-4 md:mr-4 border-2 border-gray-200 rounded-[10px] p-[5px] flex flex-col justify-between">
              <h3 className="text-lg font-semibold">Contact</h3>
              {isEditing ? (
                <>
                  <p>
                    Phone: <br />
                    <input
                      type="text"
                      value={doctorInfo.phone}
                      onChange={(e) => handleInputChange(e, "phone")}
                      className="border p-2 rounded w-full"
                    />
                  </p>
                  <p>
                    Email: <br />
                    <input
                      type="text"
                      value={doctorInfo.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      className="border p-2 rounded w-full"
                    />
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Phone: <br /> {doctorInfo.phone}
                  </p>
                  <p>
                    Email: <br /> {doctorInfo.email}
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col md:ml-4">
              <div className="mt-4 border-2 border-gray-200 rounded-[10px] p-[5px]">
                <h3 className="text-lg font-semibold">Experience</h3>
                {isEditing ? (
                  <div className="flex flex-col md:flex-row text-gray-700">
                    <input
                      type="text"
                      value={doctorInfo.experience}
                      onChange={(e) => handleInputChange(e, "experience")}
                      className="border p-2 rounded mb-2 md:mb-0 md:mr-4 w-full"
                    />
                    <input
                      type="text"
                      value={doctorInfo.age}
                      onChange={(e) => handleInputChange(e, "age")}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row text-gray-700">
                    <p className="md:mr-4">Experience: {doctorInfo.experience}</p>
                    <p>Age: {doctorInfo.age}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 border-2 border-gray-200 rounded-[10px] p-[5px]">
                <h3 className="text-lg font-semibold">Specialization</h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={doctorInfo.specialization}
                    onChange={(e) => handleInputChange(e, "specialization")}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <p className="text-gray-700">{doctorInfo.specialization}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className=" text-lg font-semibold">Current Designation</h2>
            {isEditing ? (
              <input
                type="text"
                value={doctorInfo.title}
                onChange={(e) => handleInputChange(e, "title")}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{doctorInfo.title}</p>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Qualifications</h3>
            {isEditing ? (
              <div>
                {doctorInfo.qualifications.map((qualification, index) => (
                  <input
                    key={index}
                    type="text"
                    value={qualification}
                    onChange={(e) =>
                      handleArrayChange(e, index, "qualifications")
                    }
                    className="border p-2 rounded w-full mt-2"
                  />
                ))}
              </div>
            ) : (
              doctorInfo.qualifications.map((qualification, index) => (
                <p key={index} className="text-gray-700">
                  {qualification}
                </p>
              ))
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Experience</h2>
            {isEditing ? (
              <textarea
                value={doctorInfo.bio}
                onChange={(e) => handleInputChange(e, "bio")}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p>{doctorInfo.bio}</p>
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Areas of Expertise</h3>
            {isEditing ? (
              <div>
                {doctorInfo.expertise.map((expertise, index) => (
                  <input
                    key={index}
                    type="text"
                    value={expertise}
                    onChange={(e) => handleArrayChange(e, index, "expertise")}
                    className="border p-2 rounded w-full mt-2"
                  />
                ))}
              </div>
            ) : (
              <ul className="list-disc list-inside text-gray-700">
                {doctorInfo.expertise.map((expertise, index) => (
                  <li key={index}>{expertise}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
