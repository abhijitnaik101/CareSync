import React from "react";

const DoctorProfile = () => {
  return (
    <>
      <div className="bg-blue-500 h-[50px] p-6 mx-auto max-w-4xl"></div>
      <div className="flex flex-row justify-between p-4 px-[50px] mx-auto max-w-4xl bg-gray-200 m-[4px] rounded-[10px]">
        <button className="border-2 border-black rounded-[5px] px-[35px] bg-blue-500 ">
          profile
        </button>
        <button className="border-2 border-black rounded-[5px] px-[35px] bg-white">
          Notifications
        </button>
        <button className="border-2 border-black rounded-[5px] px-[35px] bg-white">
          Schedule
        </button>
      </div>
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6 mx-auto max-w-4xl border">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            className="rounded-full w-32 h-32 md:w-48 md:h-48 mx-auto md:mx-0"
            src="https://via.placeholder.com/150"
            alt="Dr. Emma Carter"
          />
        </div>
        <div className="flex-grow md:ml-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Dr. Emma Carter</h2>
            <button className="text-blue-500 hover:underline">Edit</button>
          </div>
          <div className="text-gray-500 mt-2">
            <p className="text-sm">
              Senior Consultant Cardiologist, HeartCare Hospital
            </p>
          </div>
          <div className="flex justify-between">
            <div className="mt-4 px-[50px] border-2 border-black rounded-[10px] p-[5px] flex flex-col justify-between">
              <h3 className="text-lg font-semibold">Contact</h3>

              <p>
                Phone: <br />
                5551234567
              </p>
              <p>
                Email:
                <br /> emma.carter@heartcare.com
              </p>
            </div>

            <div>
              <div className="mt-4 border-2 border-black rounded-[10px] p-[5px]">
                <h3 className="text-lg font-semibold">Experience</h3>
                <div className="flex text-gray-700">
                  <p className="mr-4">Experience: 15 years </p>
                  <p>Age: 32</p>
                </div>
              </div>
              <div className="mt-4 border-2 border-black rounded-[10px] p-[5px]">
                <h3 className="text-lg font-semibold">Specialization</h3>
                <p className="text-gray-700">Cardiologist</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className=" text-lg font-semibold">Current designation</h2>
            <p>Senior Consultant Cardiologist, HeartCare Hospital</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Qualifications</h3>
            <p className="text-gray-700">MBBS, Johns Hopkins University</p>
            <p className="text-gray-700">MD in Cardiology, Mayo Clinic</p>
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Experience</h2>
            <p>
              Dr. Emma Carter has over 15 years of experience in cardiology,
              specializing in the management and treatment of heart diseases.
              She has held leadership roles at prestigious institutions and has
              successfully performed over 500 complex cardiac surgeries.
            </p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Areas of Expertise</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Coronary Artery Disease</li>
              <li>Heart Failure Management</li>
              <li>Hypertension and Arrhythmia Treatment</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
