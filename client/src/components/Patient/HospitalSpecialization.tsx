import React from "react";

// DoctorCard Component
const DoctorCard = ({
  name,
  schedule,
  specialty,
  hospital,
  waitingTime,
  fee,
}: {
  name: string;
  schedule: string;
  specialty: string;
  hospital: string;
  waitingTime: number;
  fee: number;
}) => {
  return (
    <div className="border rounded-lg p-4 flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">schedule: {schedule}</p>
        <p className="text-sm text-gray-500">specialty: {specialty}</p>
        <p className="text-sm text-gray-500">hospital: {hospital}</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-yellow-500 text-xl font-bold">
          {waitingTime} mins
        </div>
        <p className="text-gray-500 text-sm">waiting time</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-lg font-semibold">{fee}$</div>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
          Book appointment
        </button>
      </div>
    </div>
  );
};

// HospitalSpecialization Component
const HospitalSpecialization = ({ doctors }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Cardiologist</h2>
      <div className="space-y-4">
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            name={doctor.name}
            schedule={doctor.schedule}
            specialty={doctor.specialty}
            hospital={doctor.hospital}
            waitingTime={doctor.waitingTime}
            fee={doctor.fee}
          />
        ))}
      </div>
    </div>
  );
};

export default HospitalSpecialization;
