import React, { useState } from "react";
import MedicineTrack from "./InventoryStatus";

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
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Header Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg">
              Orders
            </button>
            <button className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg">
              Status
            </button>
            <button className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg">
              Manage Suppliers
            </button>
          </div>
          {/* Search and Category */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg w-64"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg"
              onClick={() => handleCategoryChange("medicine")}
            >
              {selectedCategory ? "Clear Category" : "Category"}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-blue-500 text-white">
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
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-5 py-3 text-sm text-gray-900">
                    {order.name}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-900">
                    {order.supplier}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-900">
                    {order.category}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-900">
                    {order.arrival}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-900">
                    {order.status}
                  </td>
                  <td className="px-5 py-3 text-sm text-blue-500">
                    <button
                      onClick={() => handleTrackClick(order)}
                      className="px-4 py-2 bg-white border rounded-lg"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                Close
              </button>
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
    </div>
  );
};

export default InventoryOrder;
