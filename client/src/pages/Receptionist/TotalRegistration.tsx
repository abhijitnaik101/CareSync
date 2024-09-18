import { FaUsers } from "react-icons/fa";

export default function ReceptionistTotalRegistration() {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg flex items-center">
      <div className="text-gray-300">
        <FaUsers className="text-5xl" />
      </div>
      <div className="ml-4">
        <div className="text-gray-400 font-medium text-xs uppercase tracking-wider">
          Total Registrations
        </div>
        <div className="text-gray-100 font-bold text-4xl mt-2">100</div>
        <div className="text-gray-400 opacity-75 text-sm mt-1">as of today</div>
      </div>
    </div>
  );
}
