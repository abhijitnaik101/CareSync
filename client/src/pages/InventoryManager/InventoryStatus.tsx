import React from "react";

interface InventoryStatusProps {
  name: string;
  supplier: string;
  arrival: string;
  status: "packaged" | "shipped" | "arrived" | "processing";
  from: string;
  to: string;
}



const InventoryStatus: React.FC<InventoryStatusProps> = ({name, supplier, arrival, status, from, to}) => {
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
    <div className="w-[633px] h-[524px] bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-sm text-gray-400">name</p>
          <h2 className="text-2xl font-bold">{name}</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">supplier</p>
          <h3 className="text-lg font-semibold">{supplier}</h3>
          <p className="text-sm text-gray-400 mt-2">expected arrival</p>
          <h3 className="text-lg font-semibold">{arrival}</h3>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mb-8 py-[20px]">
        <div className="flex items-center justify-between mb-2">
          <p
            className={`text-sm font-semibold ${
              (status === "packaged" || status==="processing") ? "text-blue-500" : "text-gray-400"
            }`}
          >
            packaged
          </p>
          <p
            className={`text-sm font-semibold ${
              status === "shipped" ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            shipped
          </p>
          <p
            className={`text-sm font-semibold ${
              status === "arrived" ? "text-green-500" : "text-gray-400"
            }`}
          >
            arrived
          </p>
        </div>
        <div className="flex items-center">
          <div
            className={`flex-1 h-2 rounded-full ${
              status === "packaged" ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`flex-1 h-2 mx-2 rounded-full ${
              status === "shipped" ? "bg-yellow-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`flex-1 h-2 rounded-full ${
              status === "arrived" ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>

      {/* Location Tracker */}
      <div className="flex justify-between items-center pt-[40px]">
        <p className="text-sm text-gray-400">{from}</p>
        <div className="flex items-center flex-1 mx-4">
          <div className="w-full h-2 bg-gray-300 rounded-full relative">
            <div
              className="absolute left-0 h-2 bg-blue-500 rounded-full"
              style={{ width: getProgressWidth() }}
            ></div>
            <div
              className="absolute h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center"
              style={{ left: getProgressWidth() }}
            >
              <span className="text-white">🚚</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400">{to}</p>
      </div>
    </div>
  );
};

export default InventoryStatus;
