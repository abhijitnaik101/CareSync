import { FaUserMd, FaClock, FaUsers } from "react-icons/fa";

// Sample data for departments and doctors
const departments = [
  {
    id: 1,
    name: "Cardiology",
    doctors: [
      { id: 1, name: "Dr. Arvind Kumar", queue: 5, avgTime: 10 },
      { id: 2, name: "Dr. Meera Singh", queue: 3, avgTime: 8 },
    ],
  },
  {
    id: 2,
    name: "Orthopedics",
    doctors: [
      { id: 3, name: "Dr. Ravi Gupta", queue: 7, avgTime: 15 },
      { id: 4, name: "Dr. Sunita Patil", queue: 4, avgTime: 12 },
    ],
  },
  {
    id: 3,
    name: "Pediatrics",
    doctors: [
      { id: 5, name: "Dr. Amit Joshi", queue: 6, avgTime: 11 },
      { id: 6, name: "Dr. Pooja Rao", queue: 2, avgTime: 7 },
    ],
  },
];

const AdminQueue = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        Outpatient Department (OPD)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-300">
              <FaUserMd className="mr-2 text-pink-500" />
              {dept.name}
            </h2>

            {dept.doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-gray-900 p-4 mb-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-medium mb-2 text-gray-200">
                  {doctor.name}
                </h3>
                <div className="flex items-center justify-between text-gray-400">
                  <div className="flex items-center">
                    <FaUsers className="mr-2 text-green-400" />
                    <span>{doctor.queue} Patients in Queue</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-blue-400" />
                    <span>{doctor.avgTime} min avg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQueue;
