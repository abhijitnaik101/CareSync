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
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center space-x-4">
            <div className="relative w-40 h-40 mb-6 md:mb-0">
              <div className="absolute inset-0 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {details.profileImage ? (
                  <img src={details.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500">No Image</span>
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
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{details.name}</h2>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={details.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={details.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={details.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="block text-gray-700 font-medium">Email:</span>
                      <p className="text-gray-600">{details.email}</p>
                    </div>
                    <div>
                      <span className="block text-gray-700 font-medium">Phone:</span>
                      <p className="text-gray-600">{details.phone}</p>
                    </div>
                    <div>
                      <span className="block text-gray-700 font-medium">Address:</span>
                      <p className="text-gray-600">{details.address}</p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
