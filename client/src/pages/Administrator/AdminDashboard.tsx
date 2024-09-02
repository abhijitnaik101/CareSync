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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search for anything here..."
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Cashflow</h2>
          <Line data={lineChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Income & Expense</h2>
          <Bar data={barChartData} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Patients</h2>
          <div className="mt-4">
            <p className="text-sm">New Patients: 21</p>
            <p className="text-sm">Returning Patients: 142</p>
            <div className="flex justify-between mt-2">
              <span className="text-sm">36.52% New patients</span>
              <span className="text-sm">61.41% Returning patients</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Stock Availability</h2>
          <div className="mt-4">
            <p className="text-sm">Total Asset: $53,000</p>
            <p className="text-sm">Total Product: 442</p>
            <div className="flex justify-between mt-2">
              <span className="text-sm">Available</span>
              <span className="text-sm">Low Stock</span>
              <span className="text-sm">Out of Stock</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold">Popular Treatment</h2>
        <div className="mt-4 space-y-2">
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
