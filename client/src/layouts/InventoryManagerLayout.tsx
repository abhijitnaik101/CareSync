import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import InventoryDashboard from "../pages/InventoryManager/InventoryDashboard";
import Inventory from "../pages/InventoryManager/Inventory";
import InventoryOrder from "../pages/InventoryManager/InventoryOrder";
import InventoryNotification from "../pages/InventoryManager/InventoryNotification";

const InventoryManagerLayout: React.FC = () => {
  const inventoryManagerLinks = [
    { name: "Dashboard", path: "/inventory-manager/dashboard" },
    { name: "Inventory", path: "/inventory-manager/inventory" },
    { name: "Orders", path: "/inventory-manager/order" },
    { name: "Notifications", path: "/inventory-manager/notifications" },
  ];

  return (
    <div className="flex">
      <Sidebar links={inventoryManagerLinks} />
      <div className="flex-1 p-4 overflow-y-scroll h-screen">
        <Routes>
          <Route path="dashboard" element={<InventoryDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="order" element={<InventoryOrder />} />
          <Route path="notifications" element={<InventoryNotification/>} />
        </Routes>
      </div>
    </div>
  );
};

export default InventoryManagerLayout;
