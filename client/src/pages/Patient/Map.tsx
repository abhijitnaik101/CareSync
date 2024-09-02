import React from "react";

const Map: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-900 text-white">
        <nav className="flex flex-col p-6 space-y-2">
          <a href="#" className="py-2 text-lg hover:bg-gray-700">
            Map
          </a>
          <a href="#" className="py-2 text-lg hover:bg-gray-700">
            Appointment
          </a>
          <a href="#" className="py-2 text-lg hover:bg-gray-700">
            History
          </a>
          <a href="#" className="py-2 text-lg hover:bg-gray-700">
            Notifications
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-6">Find Hospitals</h1>

        {/* Map and Search */}
        <div className="bg-white rounded-lg shadow p-6 relative">
          <div className="relative w-full h-[500px] bg-gray-200 rounded-md mb-4">
            <img
              src="map-placeholder.jpg" // Replace with actual map image or map component
              alt="Map"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute top-4 left-4 bg-white rounded-full shadow-lg p-2 flex items-center">
              <input
                type="text"
                placeholder="Search hospitals"
                className="px-4 py-2 border rounded-l-lg focus:outline-none"
              />
              <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-r-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Search Bar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 bg-white rounded-full shadow-lg p-2 flex items-center">
            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-l-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Specialty"
              className="px-4 py-2 border-t border-b border-r rounded-r-lg focus:outline-none w-full"
            />
            <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
