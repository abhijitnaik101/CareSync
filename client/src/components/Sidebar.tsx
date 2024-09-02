import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  links: { name: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  return (
    <div className="w-72 h-screen bg-gradient-to-b from-purple-600 to-blue-500 shadow-lg flex flex-col p-4">
      <div className="text-white text-2xl font-bold mb-8 text-center">
        My Dashboard
      </div>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `block py-3 px-6 rounded-lg transition duration-300 transform ${
                isActive
                  ? 'bg-white text-purple-600 scale-105 shadow-md'
                  : 'text-white hover:bg-purple-700 hover:scale-105'
              }`
            }
            key={link.name}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
