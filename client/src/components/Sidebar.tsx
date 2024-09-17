import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  links: { name: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  return (
    <div
      className="font-poppins w-64 h-screen shadow-lg flex flex-col p-5 bg-gray-900"
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
  );
};

export default Sidebar;
