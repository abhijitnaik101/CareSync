import { FaHourglassHalf, FaUserCheck } from "react-icons/fa";

export default function ReceptionistRegistrationStatus() {
  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg">
      <h3 className="text-gray-100 font-semibold text-lg mb-4">
        Registration Status
      </h3>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <FaUserCheck className="text-green-400 text-2xl" />
          <span className="ml-2 text-gray-200 font-medium">Approved</span>
        </div>
        <div className="text-gray-100 font-bold">50</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FaHourglassHalf className="text-yellow-400 text-2xl" />
          <span className="ml-2 text-gray-200 font-medium">Pending</span>
        </div>
        <div className="text-gray-100 font-bold">50</div>
      </div>
    </div>
  );
}
