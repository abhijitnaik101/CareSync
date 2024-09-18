import React from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import {
  FiSearch,
  FiPlus,
  FiUsers,
  FiActivity,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const AdminDashboard: React.FC = () => {
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
        label: "Cashflow",
        data: [
          12000, 19000, 3000, 5000, 20000, 30000, 25000, 32000, 29000, 40000,
          45000, 50000,
        ],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
    ],
  };

  const doughnutChartData = {
    labels: [
      "Rental Cost",
      "Wages",
      "Medical Equipment",
      "Supplies",
      "Promotion Costs",
      "Other",
    ],
    datasets: [
      {
        data: [30000, 22000, 15640, 13564, 8000, 2000],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const barChartData = {
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
        label: "Income",
        data: [
          1200, 1900, 3000, 5000, 2000, 3000, 2500, 3200, 2900, 4000, 4500,
          5000,
        ],
        backgroundColor: "#36A2EB",
      },
      {
        label: "Expenses",
        data: [
          600, 900, 1500, 2500, 1000, 1500, 1250, 1600, 1450, 2000, 2250, 2500,
        ],
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for anything here..."
              className="px-10 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md">
            <FiPlus />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center">
            <FiActivity className="mr-2" /> Cashflow
          </h2>
          <Line data={lineChartData} />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center">
            <FiShoppingBag className="mr-2" /> Expenses
          </h2>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center">
            <FiActivity className="mr-2" /> Income & Expense
          </h2>
          <Bar data={barChartData} />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center">
            <FiUsers className="mr-2" /> Patients
          </h2>
          <div className="mt-4">
            <p className="text-sm text-gray-300">New Patients: 21</p>
            <p className="text-sm text-gray-300">Returning Patients: 142</p>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>36.52% New patients</span>
              <span>61.41% Returning patients</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center">
            <FiShoppingBag className="mr-2" /> Stock Availability
          </h2>
          <div className="mt-4">
            <p className="text-sm text-gray-300">Total Asset: $53,000</p>
            <p className="text-sm text-gray-300">Total Product: 442</p>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>Available</span>
              <span>Low Stock</span>
              <span>Out of Stock</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center">
          <FiStar className="mr-2" /> Popular Treatment
        </h2>
        <div className="mt-4 space-y-2 text-gray-400">
          <div className="flex justify-between">
            <span>Scaling Teeth</span>
            <span>4.7</span>
          </div>
          <div className="flex justify-between">
            <span>Tooth Extraction</span>
            <span>4.6</span>
          </div>
          <div className="flex justify-between">
            <span>General Checkup</span>
            <span>4.6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
