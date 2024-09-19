import React from "react";
import { FaBox, FaTruck, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface InventoryStatusProps {
  name: string;
  supplier: string;
  arrival: string;
  status: "packaged" | "shipped" | "arrived" | "processing";
  from: string;
  to: string;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({
  name,
  supplier,
  arrival,
  status,
  from,
  to,
}) => {
  // Calculate width based on status
  const getProgressWidth = () => {
    switch (status) {
      case "packaged":
        return "33%";
      case "shipped":
        return "66%";
      case "arrived":
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <div className="w-[633px] h-[524px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl p-6 transform transition-transform hover:scale-105">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-sm text-gray-400">Item Name</p>
          <h2 className="text-2xl font-bold text-white">{name}</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Supplier</p>
          <h3 className="text-lg font-semibold text-gray-300">{supplier}</h3>
          <p className="text-sm text-gray-400 mt-2">Expected Arrival</p>
          <h3 className="text-lg font-semibold text-gray-300">{arrival}</h3>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mb-8 py-4">
        <div className="flex items-center justify-between mb-2">
          <p
            className={`text-sm font-semibold ${
              status === "packaged" || status === "processing"
                ? "text-blue-400"
                : "text-gray-500"
            }`}
          >
            <FaBox className="inline mr-1" /> Packaged
          </p>
          <p
            className={`text-sm font-semibold ${
              status === "shipped" ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            <FaTruck className="inline mr-1" /> Shipped
          </p>
          <p
            className={`text-sm font-semibold ${
              status === "arrived" ? "text-green-400" : "text-gray-500"
            }`}
          >
            <FaCheckCircle className="inline mr-1" /> Arrived
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex-1 h-2 bg-gray-600 rounded-full">
            <motion.div
              className="h-2 bg-blue-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: getProgressWidth() }}
              transition={{ duration: 0.8 }}
            ></motion.div>
          </div>
        </div>
      </div>

      {/* Location Tracker */}
      <div className="flex justify-between items-center pt-8">
        <p className="text-sm text-gray-500">{from}</p>
        <div className="flex items-center flex-1 mx-4 relative">
          <div className="w-full h-2 bg-gray-600 rounded-full relative">
            <motion.div
              className="absolute h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
              style={{ left: getProgressWidth() }}
              initial={{ left: "0%" }}
              animate={{ left: getProgressWidth() }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white text-lg">
                {status === "arrived" ? "📦" : "🚚"}
              </span>
            </motion.div>
          </div>
        </div>
        <p className="text-sm text-gray-500">{to}</p>
      </div>
    </div>
  );
};

export default InventoryStatus;
