import React from "react";

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
        return "0%";
      case "shipped":
        return "50%";
      case "arrived":
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <div className="w-[633px] h-[524px] bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-sm text-gray-400">Name</p>
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
            Packaged
          </p>
          <p
            className={`text-sm font-semibold ${
              status === "shipped" ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            Shipped
          </p>
          <p
            className={`text-sm font-semibold ${
              status === "arrived" ? "text-green-400" : "text-gray-500"
            }`}
          >
            Arrived
          </p>
        </div>
        <div className="flex items-center">
          <div
            className={`flex-1 h-2 rounded-full ${
              status === "packaged" ? "bg-blue-400" : "bg-gray-600"
            }`}
          ></div>
          <div
            className={`flex-1 h-2 mx-2 rounded-full ${
              status === "shipped" ? "bg-yellow-400" : "bg-gray-600"
            }`}
          ></div>
          <div
            className={`flex-1 h-2 rounded-full ${
              status === "arrived" ? "bg-green-400" : "bg-gray-600"
            }`}
          ></div>
        </div>
      </div>

      {/* Location Tracker */}
      <div className="flex justify-between items-center pt-8">
        <p className="text-sm text-gray-500">{from}</p>
        <div className="flex items-center flex-1 mx-4 relative">
          <div className="w-full h-2 bg-gray-600 rounded-full relative">
            <div
              className="absolute left-0 h-2 bg-blue-400 rounded-full"
              style={{ width: getProgressWidth() }}
            ></div>
            <div
              className="absolute h-6 w-6 bg-blue-400 rounded-full flex items-center justify-center"
              style={{ left: getProgressWidth() }}
            >
              <span className="text-white text-xl">🚚</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">{to}</p>
      </div>
    </div>
  );
};

export default InventoryStatus;
