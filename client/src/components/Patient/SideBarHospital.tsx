import React, { useEffect, useState } from "react";
import { socket } from "../../socket";

const SideBarHospital = ({ hospitals, doctors, searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: '',
    age: '',
    gender: '',
    appointType: '',
    patientId: '',
    doctorId: '',
    hospitalId: '',
    appointmentDate: '',
  });

  const handleBookAppointment = (doctorId: any, doctorName: any, hospitalId: any) => {
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      doctorId,
      doctorName,
      hospitalId,
    }));
    setIsModalOpen(true); // Open modal when "Book" button is clicked
  };

  // const handleSubmit = () => {
  //   // Make the fetch request to book the appointment
  //   fetch('/bookappointment', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(appointmentDetails),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setIsModalOpen(false); // Close modal after successful submission
  //     })
  //     .catch((error) => console.error(error));
  // };

  // useEffect(() => {
  //   // **Queue Management**: Listen for queue updates
  //   socket.on('queue-update', (data) => {
  //     setQueue(data);
  //   });

    
  //   // Clean up when component unmounts
  //   return () => {
  //     socket.off('queue-update');
  //   };
  // }, []);

  //socket to send notification to receptionist
  
  
  const handleSubmit = () => {
    // const patientData = {
    //   id: 12345,
    //   name: "John Doe",
    //   age: 30,
    //   gender: "Male",
    //   appointType: "General Checkup",
    //   appointmentDate: "2023-02-20T14:00:00",
    //   doctorName: "Dr. Jane Smith",
    //   hospitalId: 1,
    //   doctorId: 101
    // };
    console.log("appointment details sent to receptionist: ", appointmentDetails);
    socket.emit('book-appointment', appointmentDetails);
    
    setIsModalOpen(false);

    
  }
  


  return (
    <div>
    <div className="absolute top-16 left-6 mt-8 p-6 h-96 bg-slate-50 rounded-lg shadow-lg overflow-y-scroll">
      <div className="space-y-6">
        {
          hospitals.find((hospital: { name: any; }) => hospital.name === searchTerm)?.departments
          .map((department: { department: any; doctors: any[]; }) => (
            <div key={department.department} className="p-4 border-b-2">
              <p className="text-2xl font-semibold text-gray-800 mb-3">{department.department}</p>
              <div className="border rounded-lg p-4 space-y-4 bg-white shadow-sm">
                {department.doctors.map((doctorId) => {
                  const doctor = doctors.find((doc: { doctor_id: any; }) => doc.doctor_id === doctorId);
                  return (
                    <div key={doctorId} className="flex justify-between items-center p-2 border-b last:border-b-0">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{doctor?.name}</p>
                        <p className="text-sm text-gray-600">{doctor?.experience}</p>
                      </div>
                      <button
                        className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300"
                        onClick={() => handleBookAppointment(doctorId, doctor.name, hospitals.find((hospital: { name: any; }) => hospital.name === searchTerm)?.id)}
                      >
                        Book
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        }
      </div>

      
    </div>
      {/* Modal for Booking Appointment */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 inset-0 w-full bg-black bg-opacity-50 flex justify-center items-center">
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
                  onChange={(e) => setAppointmentDetails({ ...appointmentDetails, age: e.target.value })}
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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
                  <option value="Inpatient">Inpatient</option>
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
