import React, { useState } from "react";

interface MedicineDetailProps {
  medicineName: string;
  inStock: number;
  expDate: string;
  mfgDate: string;
  price: number;
  category: string;
  type: string;
  description: string;
}

const MedicineDetail: React.FC<MedicineDetailProps> = ({
  medicineName,
  inStock,
  expDate,
  mfgDate,
  price,
  category,
  type,
  description,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    medicineName,
    inStock,
    expDate,
    mfgDate,
    price,
    category,
    type,
    description,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative flex items-center justify-center h-max rounded-md bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEditing ? "Edit Medicine Details" : "Medicine Details"}
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition-colors"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image and Actions */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <img
              className="w-48 h-48 rounded-lg mb-4 object-cover"
              src="https://via.placeholder.com/150"
              alt="Medicine"
            />
            <button className="w-full bg-red-500 text-white py-2 rounded-md shadow hover:bg-red-600 transition-colors">
              Order More
            </button>
          </div>

          {/* Medicine Details */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Medicine Name */}
              <div className="col-span-2">
                <label className="block text-gray-600 font-medium mb-1">
                  Medicine Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="medicineName"
                    value={editedDetails.medicineName}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">{medicineName}</p>
                )}
              </div>

              {/* In Stock */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  In Stock
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="inStock"
                    value={editedDetails.inStock}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  <p className="text-gray-800">{inStock}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Price (₹)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="price"
                    value={editedDetails.price}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  <p className="text-gray-800">₹{price}</p>
                )}
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Expiry Date
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="expDate"
                    value={editedDetails.expDate}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  <p className="text-gray-800">{expDate}</p>
                )}
              </div>

              {/* Manufacturing Date */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Manufacturing Date
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="mfgDate"
                    value={editedDetails.mfgDate}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  <p className="text-gray-800">{mfgDate}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Category
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="category"
                    value={editedDetails.category}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  <p className="text-gray-800">{category}</p>
                )}
              </div>

              {/* Type */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Type
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="type"
                    value={editedDetails.type}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                ) : (
                  <p className="text-gray-800">{type}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Description
              </label>
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedDetails.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 h-24"
                />
              ) : (
                <p className="text-gray-800">{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
