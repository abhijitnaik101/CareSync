import { FaFemale, FaMale, FaUsers } from "react-icons/fa";

export default function ReceptionistGenderAgeDistribution(){
    return(
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg">
              <h3 className="text-white font-semibold text-lg mb-4">Gender and Age Distribution</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaMale className="text-blue-300 text-2xl" />
                  <span className="ml-2 text-white font-medium">Male</span>
                </div>
                <div className="text-white font-bold">50</div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaFemale className="text-pink-300 text-2xl" />
                  <span className="ml-2 text-white font-medium">Female</span>
                </div>
                <div className="text-white font-bold">5</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaUsers className="text-green-300 text-2xl" />
                  <span className="ml-2 text-white font-medium">Elderly</span>
                </div>
                <div className="text-white font-bold">45</div>
              </div>
            </div>
    )
}