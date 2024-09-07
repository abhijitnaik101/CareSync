import React, { useState, useEffect } from 'react';

interface ProfileDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
}

const defaultProfile: ProfileDetails = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8901',
  address: '1234 Elm Street, Springfield, USA',
  profileImage: 'https://via.placeholder.com/150'
};

const PatientProfile: React.FC = () => {
  const [details, setDetails] = useState<ProfileDetails>(defaultProfile);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Load profile details from sessionStorage if available
    const storedDetails = sessionStorage.getItem('profileDetails');
    if (storedDetails) {
      setDetails(JSON.parse(storedDetails));
    }
  }, []);

  useEffect(() => {
    // Save profile details to sessionStorage whenever they change
    sessionStorage.setItem('profileDetails', JSON.stringify(details));
  }, [details]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setDetails({ ...details, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gradient Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-48 flex items-center justify-center">
        <h1 className="text-white text-4xl font-extrabold">Patient Profile</h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
            {/* Profile Image Section */}
            <div className="col-span-1 flex justify-center items-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {details.profileImage ? (
                    <img src={details.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 text-lg">No Image</span>
                  )}
                </div>
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute bottom-0 right-0 text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                )}
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="col-span-2">
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={details.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={details.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={details.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <span className="block text-lg font-medium text-gray-700">Email:</span>
                    <p className="text-gray-600">{details.email}</p>
                  </div>
                  <div>
                    <span className="block text-lg font-medium text-gray-700">Phone:</span>
                    <p className="text-gray-600">{details.phone}</p>
                  </div>
                  <div>
                    <span className="block text-lg font-medium text-gray-700">Address:</span>
                    <p className="text-gray-600">{details.address}</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
