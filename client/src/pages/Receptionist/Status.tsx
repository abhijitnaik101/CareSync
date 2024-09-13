import { FaHourglassHalf, FaUserCheck } from "react-icons/fa";

export default function ReceptionistRegistrationStatus() {
    return (
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg">
            <h3 className="text-white font-semibold text-lg mb-4">Registration Status</h3>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <FaUserCheck className="text-green-300 text-2xl" />
                    <span className="ml-2 text-white font-medium">Approved</span>
                </div>
                <div className="text-white font-bold">50</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <FaHourglassHalf className="text-yellow-300 text-2xl" />
                    <span className="ml-2 text-white font-medium">Pending</span>
                </div>
                <div className="text-white font-bold">50</div>
            </div>
        </div>
    )
}