import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  FiUsers,
  FiUserCheck,
  FiClock,
  FiUser,
  FiPlusCircle,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminOPD: React.FC = () => {
  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Patients",
        data: [50, 60, 70, 80, 60, 70, 90, 100, 110, 120, 90, 100],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "ICU",
        data: [40, 50, 70, 60, 80, 60],
        backgroundColor: "#4c51bf",
      },
      {
        label: "OPD",
        data: [60, 70, 80, 90, 50, 40],
        backgroundColor: "#48bb78",
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-100">
      <h1 className="text-3xl font-extrabold text-white mb-6">
        OPD Management - Admin Panel
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Doctors</p>
            <h2 className="text-2xl font-bold text-white">998</h2>
          </div>
          <FiUser className="text-blue-400 text-4xl" />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Patients</p>
            <h2 className="text-2xl font-bold text-white">1072</h2>
          </div>
          <FiUsers className="text-green-400 text-4xl" />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Attended</p>
            <h2 className="text-2xl font-bold text-white">72</h2>
          </div>
          <FiCheckCircle className="text-indigo-400 text-4xl" />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Pending</p>
            <h2 className="text-2xl font-bold text-white">618</h2>
          </div>
          <FiAlertCircle className="text-yellow-400 text-4xl" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-white mb-4">
            Patient Total
          </h3>
          <Line data={lineChartData} />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-white mb-4">Patients In</h3>
          <Bar data={barChartData} />
        </div>
      </div>

      {/* Upcoming Appointments and Doctors Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-white mb-4">
            Upcoming Appointments
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <div>
                <p className="font-bold text-white">Bernardo Galaviz</p>
                <p className="text-sm text-gray-400">
                  Appointment With Dr. Cristina Groves
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">7:00 PM</p>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
                  Take up
                </button>
              </div>
            </li>
            {/* Add more appointments similarly */}
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-white mb-4">Doctors</h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <div>
                <p className="font-bold text-white">John Doe</p>
                <p className="text-sm text-gray-400">MBBS, MD</p>
              </div>
            </li>
            {/* Add more doctors similarly */}
          </ul>
        </div>
      </div>

      {/* New Patients and Hospital Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-white mb-4">
            New Patients
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <div>
                <p className="font-bold text-white">John Doe</p>
                <p className="text-sm text-gray-400">johndoe21@gmail.com</p>
                <p className="text-sm text-gray-400">+1-202-555-0125</p>
              </div>
              <div className="text-right">
                <span className="bg-yellow-500 text-yellow-100 text-sm px-2 py-1 rounded">
                  Fever
                </span>
              </div>
            </li>
            {/* Add more patients similarly */}
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-white mb-4">
            Hospital Management
          </h3>
          <div>
            <p className="text-sm text-gray-400 mb-1">OPD</p>
            <div className="bg-gray-700 h-4 rounded-lg overflow-hidden">
              <div
                className="bg-blue-500 h-full"
                style={{ width: "12%" }}
              ></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-1">New Patient</p>
            <div className="bg-gray-700 h-4 rounded-lg overflow-hidden">
              <div
                className="bg-green-500 h-full"
                style={{ width: "71%" }}
              ></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-1">Laboratory Test</p>
            <div className="bg-gray-700 h-4 rounded-lg overflow-hidden">
              <div
                className="bg-orange-500 h-full"
                style={{ width: "42%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOPD;
