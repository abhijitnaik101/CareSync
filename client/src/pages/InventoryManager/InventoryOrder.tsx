import React, { useState } from "react";
import MedicineTrack from "./InventoryStatus";
import { FaTimes } from "react-icons/fa";

interface InventoryOrderProps {
  orders: {
    name: string;
    supplier: string;
    category: string;
    arrival: string;
    status: string;
  }[];
}

const orders = [
  {
    name: "Aspirin",
    supplier: "Wellness Meds",
    category: "Medicine",
    arrival: "4 days",
    status: "arrived",
  },
  {
    name: "Amoxicillin",
    supplier: "CarePlus Pharmacy",
    category: "Antibiotic",
    arrival: "2 days",
    status: "shipped",
  },
  {
    name: "Metformin",
    supplier: "Diabetes Care",
    category: "Medicine",
    arrival: "6 days",
    status: "processing",
  },
];

const InventoryOrder: React.FC<InventoryOrderProps> = () => {
  const [selectedOrder, setSelectedOrder] = useState<
    null | InventoryOrderProps["orders"][0]
  >(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleTrackClick = (order: InventoryOrderProps["orders"][0]) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  // Filter orders based on search query and selected category
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? order.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button className="py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-500 transition duration-300">
            Orders
          </button>
          <button className="py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-500 transition duration-300">
            Status
          </button>
          <button className="py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-500 transition duration-300">
            Manage Suppliers
          </button>
        </div>
        {/* Search and Category */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg w-64 bg-gray-800 text-gray-300 border-gray-700 focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-500 transition duration-300"
            onClick={() => handleCategoryChange("medicine")}
          >
            {selectedCategory ? "Clear Category" : "Category"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Supplier
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Arrival
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold">
                Track
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-700 transition-colors">
                <td className="px-5 py-3 text-sm">{order.name}</td>
                <td className="px-5 py-3 text-sm">{order.supplier}</td>
                <td className="px-5 py-3 text-sm">{order.category}</td>
                <td className="px-5 py-3 text-sm">{order.arrival}</td>
                <td className="px-5 py-3 text-sm">{order.status}</td>
                <td className="px-5 py-3 text-sm">
                  <button
                    onClick={() => handleTrackClick(order)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Track
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-transform transform hover:scale-110"
            onClick={closeModal}
          >
            <FaTimes className="w-6 h-6" />
          </button>
      
          {/* Medicine Tracking Info */}
          <MedicineTrack
            name={selectedOrder.name}
            supplier={selectedOrder.supplier}
            arrival={selectedOrder.arrival}
            status={
              selectedOrder.status as "packaged" | "shipped" | "arrived"
            }
            from="Origin"
            to="Destination"
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default InventoryOrder;
