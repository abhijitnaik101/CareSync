import { FaFemale, FaMale, FaUsers } from "react-icons/fa";

export default function ReceptionistGenderAgeDistribution() {
  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 p-8 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-100 mb-6">
        Gender and Age Distribution
      </h3>

      {/* Male Distribution */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FaMale className="text-blue-400 text-3xl" />
          <span className="text-lg font-medium text-gray-200">Male</span>
        </div>
        <div className="text-xl font-bold text-white">50</div>
      </div>

      {/* Female Distribution */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FaFemale className="text-pink-400 text-3xl" />
          <span className="text-lg font-medium text-gray-200">Female</span>
        </div>
        <div className="text-xl font-bold text-white">5</div>
      </div>

      {/* Elderly Distribution */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaUsers className="text-green-400 text-3xl" />
          <span className="text-lg font-medium text-gray-200">Elderly</span>
        </div>
        <div className="text-xl font-bold text-white">45</div>
      </div>
    </div>
  );
}
