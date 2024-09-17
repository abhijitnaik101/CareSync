import React, { useState } from 'react';
import { socket } from '../../socket';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import patientState from '../../recoil/atoms/patientAtom';
import { Hospital } from '../../Types';
import { route } from '../../../backendroute';

const SideBarHospital: React.FC<{ hospitals: Hospital[], searchTerm: string }> = ({ hospitals, searchTerm }) => {

  console.log("SideBarHospital", hospitals, searchTerm);
  const [patient, setPatient] = useRecoilState(patientState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: patient?.name,
    age: patient?.age,
    gender: patient?.gender,
    appointType: '',
    patientId: patient?.id,
    doctorId: 1,
    hospitalId: 1,
    hospitalName: '',
    appointmentDate: '',
  });

  const handleBookAppointment = (doctorId: number, doctorName: string, hospitalId: number) => {
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      doctorId,
      doctorName,
      hospitalId,
    }));
    setIsModalOpen(true); // Open modal when "Book" button is clicked
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post<{message: string, ticket: any}>(route + `/booking/bookappointment/`, appointmentDetails)
      // await axios.post(route + `/booking/bookappointment/`, appointmentDetails)
      socket.emit('book-appointment', response.data.ticket); //server ku trigger kariba
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false);
  };

  const selectedHospital = hospitals.find(hospital => hospital.name === searchTerm);

  return (
    <div>
      <div className="absolute w-full top-16 left-6 mt-8 p-6 h-96 bg-slate-50 rounded-lg shadow-lg overflow-y-scroll z-20">
        <div className="space-y-6">
          {selectedHospital?.departments.map(department => (
            <div key={department.id} className="p-4 border-b-2">
              <p className="text-2xl font-semibold text-gray-800 mb-3">{department.name}</p>
              <div className="border rounded-lg p-4 space-y-4 bg-white shadow-sm">
                {department.doctors.map(doctor => (
                  <div key={doctor.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{doctor.name}</p>
                      <p className="text-sm text-gray-600">Avg. Treatment Time: {doctor.averageTreatmentTime} mins</p>
                    </div>
                    <button
                      className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300"
                      onClick={() => handleBookAppointment(doctor.id, doctor.name, selectedHospital.id)}
                    >
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Booking Appointment */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 inset-0 w-full bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Book Appointment</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                  value={appointmentDetails.name}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Age</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                  value={appointmentDetails.age}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, age: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Gender</label>
                <select
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                  value={appointmentDetails.gender}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="TRANS">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Appointment Type</label>
                <select
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                  value={appointmentDetails.appointType}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, appointType: e.target.value })}
                >
                  <option value="">Select Type</option>
                  <option value="OPD">OPD</option>
                  <option value="IPD">Inpatient</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Appointment Date</label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
                  value={appointmentDetails.appointmentDate}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, appointmentDate: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={handleSubmit}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBarHospital;
