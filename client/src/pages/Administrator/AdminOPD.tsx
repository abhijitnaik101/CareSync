import React from "react";
import { Line, Bar } from "react-chartjs-2";
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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">OPD Management - Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Doctors</p>
            <h2 className="text-2xl font-bold">$998</h2>
          </div>
          <div className="text-blue-500">
            <i className="fas fa-user-md text-3xl"></i>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Patients</p>
            <h2 className="text-2xl font-bold">1072</h2>
          </div>
          <div className="text-green-500">
            <i className="fas fa-users text-3xl"></i>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Attended</p>
            <h2 className="text-2xl font-bold">72</h2>
          </div>
          <div className="text-indigo-500">
            <i className="fas fa-check-circle text-3xl"></i>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-2xl font-bold">618</h2>
          </div>
          <div className="text-yellow-500">
            <i className="fas fa-exclamation-circle text-3xl"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Patient Total</h3>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Patients In</h3>
          <Bar data={barChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
          <ul>
            <li className="flex justify-between mb-4">
              <div>
                <p className="font-bold">Bernardo Galaviz</p>
                <p className="text-sm text-gray-500">Appointment With Dr. Cristina Groves</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">7:00 PM</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Take up</button>
              </div>
            </li>
            {/* Add more appointments similarly */}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Doctors</h3>
          <ul>
            <li className="flex justify-between mb-4">
              <div>
                <p className="font-bold">John Doe</p>
                <p className="text-sm text-gray-500">MBBS, MD</p>
              </div>
            </li>
            {/* Add more doctors similarly */}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">New Patients</h3>
          <ul>
            <li className="flex justify-between mb-4">
              <div>
                <p className="font-bold">John Doe</p>
                <p className="text-sm text-gray-500">johndoe21@gmail.com</p>
                <p className="text-sm text-gray-500">+1-202-555-0125</p>
              </div>
              <div className="text-right">
                <span className="bg-yellow-300 text-yellow-800 text-sm px-2 py-1 rounded">Fever</span>
              </div>
            </li>
            {/* Add more patients similarly */}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Hospital Management</h3>
          <div>
            <p className="text-sm text-gray-500 mb-1">OPD</p>
            <div className="bg-gray-200 h-4 rounded-lg overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: "12%" }}></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">New Patient</p>
            <div className="bg-gray-200 h-4 rounded-lg overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: "71%" }}></div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">Laboratory Test</p>
            <div className="bg-gray-200 h-4 rounded-lg overflow-hidden">
              <div className="bg-orange-500 h-full" style={{ width: "42%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOPD;
