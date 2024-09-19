import React, { useState } from 'react';
import { socket } from '../../socket';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import patientState from '../../recoil/atoms/patientAtom';
import { Hospital } from '../../Types';
import { route } from '../../../backendroute';
import { FaCalendarAlt, FaUserMd, FaRegClock } from 'react-icons/fa';
import { MdClose, MdCheckCircle } from 'react-icons/md';

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
      const response = await axios.post<{ message: string, ticket: any }>(route + `/booking/bookappointment/`, appointmentDetails);
      socket.emit('book-appointment', response.data.ticket); //server ku trigger kariba
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false);
  };

  const selectedHospital = hospitals.find(hospital => hospital.name === searchTerm);

  return (
    <div>
      <div className="absolute top-16 left-6 mt-8 p-1 h-[80%] bg-gray-900 text-white rounded-lg shadow-xl overflow-y-scroll z-20">
        <div className="space-y-6">
          {selectedHospital?.departments.map(department => (
            <div key={department.id} className="p-4 border-b-2 border-gray-700">
              <p className="text-2xl font-bold text-teal-400 mb-3">{department.name}</p>
              <div className="border border-gray-800 rounded-lg p-4 space-y-4 bg-gray-800 shadow-sm">
                {department.doctors.map(doctor => (
                  <div key={doctor.id} className="flex justify-between items-center p-2 border-b border-gray-700 last:border-b-0">
                    <div>
                      <p className="text-lg font-semibold text-teal-300 flex items-center">
                        <FaUserMd className="mr-2" /> {doctor.name}
                      </p>
                      <p className="text-sm text-gray-400 flex items-center">
                        <FaRegClock className="mr-2" /> waiting time: <span className='font-bold mx-1'> {doctor.averageTreatmentTime}</span> mins
                      </p>
                    </div>
                    <button
                      className="bg-teal-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-teal-700 transition duration-300"
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
        <div className="fixed top-0 left-0 inset-0 w-full bg-black bg-opacity-70 flex justify-center items-center z-20">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-teal-400">Book Appointment</h3>
              <MdClose className="text-2xl cursor-pointer hover:text-teal-500" onClick={() => setIsModalOpen(false)} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring focus:ring-teal-500"
                  value={appointmentDetails.name}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium">Age</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring focus:ring-teal-500"
                  value={appointmentDetails.age}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, age: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium">Gender</label>
                <select
                  className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring focus:ring-teal-500"
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
                <label className="block text-gray-400 font-medium">Appointment Type</label>
                <select
                  className="w-full mt-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring focus:ring-teal-500"
                  value={appointmentDetails.appointType}
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, appointType: e.target.value })}
                >
                  <option value="">Select Type</option>
                  <option value="OPD">OPD</option>
                  <option value="IPD">Inpatient</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-medium">Appointment Date</label>
                <div className="flex items-center mt-1">
                  <FaCalendarAlt className="text-teal-400 mr-2" />
                  <input
                    type="date"
                    className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring focus:ring-teal-500"
                    value={appointmentDetails.appointmentDate}
                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, appointmentDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
                  onClick={() => setIsModalOpen(false)}
                >
                  <MdClose className="mr-1" /> Cancel
                </button>
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition duration-300 flex items-center"
                  onClick={handleSubmit}
                >
                  <MdCheckCircle className="mr-1" /> Confirm Booking
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
