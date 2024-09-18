import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // For menu and close icons

interface SidebarProps {
  links: { name: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-20">
      {/* Menu Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-900 p-2 rounded-md"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 p-5 shadow-lg transform transition-transform duration-300 z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex flex-col`}
        style={{
          background: "linear-gradient(145deg, #111827, #1f2937)", // Subtle dark gradient background
        }}
      >
        {/* Dashboard Title */}
        <div
          className="text-white text-2xl font-semibold mb-10 text-center"
          style={{
            background: "linear-gradient(to right, #f472b6, #f97316)", // Vibrant gradient text
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Dashboard
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 font-medium">
          {links.map((link) => (
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
              key={link.name}
              onClick={() => setIsOpen(false)} // Close sidebar on link click
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <footer className="mt-auto pt-4">
          <p className="text-gray-500 text-xs text-center">© 2024 Your Brand</p>
        </footer>
      </div>

      {/* Overlay for Mobile when Sidebar is Open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;
