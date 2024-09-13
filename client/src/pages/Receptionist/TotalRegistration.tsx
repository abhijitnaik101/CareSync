import { FaUsers } from "react-icons/fa";

export default function ReceptionistTotalRegistration() {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-lg shadow-lg flex items-center">
              <div className="text-white">
                <FaUsers className="text-5xl" />
              </div>
              <div className="ml-4">
                <div className="text-white font-medium text-sm uppercase tracking-wider">Total Registrations</div>
                <div className="text-white font-bold text-4xl mt-2">100</div>
                <div className="text-white opacity-75 text-sm mt-1">as of today</div>
              </div>
            </div>
    )
}