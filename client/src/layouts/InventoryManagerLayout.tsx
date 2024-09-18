import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import InventoryDashboard from "../pages/InventoryManager/InventoryDashboard";
import Inventory from "../pages/InventoryManager/Inventory";
import InventoryOrder from "../pages/InventoryManager/InventoryOrder";
import InventoryNotification from "../pages/InventoryManager/InventoryNotification";
import axios from "axios";
import { route } from "../../backendroute";

const InventoryManagerLayout: React.FC = () => {
  const inventoryManagerLinks = [
    { name: "Dashboard", path: "/inventory-manager/dashboard" },
    { name: "Inventory", path: "/inventory-manager/inventory" },
    { name: "Orders", path: "/inventory-manager/order" },
    { name: "Notifications", path: "/inventory-manager/notifications" },
  ];
  const navigate = useNavigate();

  const fetchInventoryman = async (token: string) => {
    try {
      await axios.get(route + "/authenticate/inventoryman", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else
    fetchInventoryman(token);
  }, []);

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
