import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const InventoryDashboard: React.FC = () => {
  // Dummy Data for Medicines
  const medicineData = [
    { name: "Paracetamol", stock: 120, expiration: "2025-12-01", status: "In Stock" },
    { name: "Amoxicillin", stock: 80, expiration: "2024-11-01", status: "In Stock" },
    { name: "Ibuprofen", stock: 45, expiration: "2023-08-15", status: "Low Stock" },
    { name: "Metformin", stock: 30, expiration: "2024-05-30", status: "Low Stock" },
    { name: "Aspirin", stock: 200, expiration: "2026-02-01", status: "In Stock" },
  ];

  const lowStockAlerts = medicineData.filter(medicine => medicine.stock < 50);

  // Dummy data for the past 6 months' profit
  const profitData = [
    { month: "April", profit: 1200 },
    { month: "May", profit: 900 },
    { month: "June", profit: 1400 },
    { month: "July", profit: 1500 },
    { month: "August", profit: 1100 },
    { month: "September", profit: 1600 },
  ];

  // Dummy data for the past 6 months' medicine supplied
  const suppliedData = [
    { month: "April", supplied: 600 },
    { month: "May", supplied: 450 },
    { month: "June", supplied: 700 },
    { month: "July", supplied: 750 },
    { month: "August", supplied: 500 },
    { month: "September", supplied: 800 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded shadow">
          <div className="text-sm">Total Medicines</div>
          <div className="text-2xl font-bold">{medicineData.length}</div>
          <div className="text-xs">+5 New Medicines</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-red-400 to-yellow-500 text-white rounded shadow">
          <div className="text-sm">Low Stock Medicines</div>
          <div className="text-2xl font-bold">{lowStockAlerts.length}</div>
          <div className="text-xs">Check Inventory</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded shadow">
          <div className="text-sm">Expired Medicines</div>
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs">No Expired Medicines</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded shadow">
          <div className="text-sm">Total Stock Value</div>
          <div className="text-2xl font-bold">$12,500</div>
          <div className="text-xs">+3% This Month</div>
        </div>
      </div>

      {/* Medicine Inventory */}
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Medicine Inventory</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="p-2">Medicine Name</th>
                <th className="p-2">Stock Quantity</th>
                <th className="p-2">Expiration Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {medicineData.map((medicine, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{medicine.name}</td>
                  <td className="p-2">{medicine.stock}</td>
                  <td className="p-2">{medicine.expiration}</td>
                  <td
                    className={`p-2 ${
                      medicine.status === "Low Stock" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {medicine.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white p-4 rounded shadow">
        <div className="text-sm text-gray-500">Low Stock Alerts</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="p-2">Medicine Name</th>
                <th className="p-2">Stock Quantity</th>
              </tr>
            </thead>
            <tbody>
              {lowStockAlerts.map((medicine, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{medicine.name}</td>
                  <td className="p-2">{medicine.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Profit by Month Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Monthly Profit</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="profit" fill="url(#colorProfit)" />
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Medicine Supplied by Month Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Medicines Supplied per Month</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={suppliedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="supplied" fill="url(#colorSupplied)" />
              <defs>
                <linearGradient id="colorSupplied" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
