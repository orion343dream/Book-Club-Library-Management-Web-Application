import React, { useState, type JSX } from "react";
import {
  MdDashboard,
  MdPeople,
  MdLibraryBooks,
  MdShoppingCart,
  MdWarning,
  MdCategory,
  MdPerson,
  MdHistory,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface SidebarItem {
  id: string;
  label: string;
  icon: JSX.Element;
}

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const navigate = useNavigate();

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (itemId === "dashboard") navigate(`/dashboard`);
    else navigate(`/dashboard/${itemId.toLowerCase()}`);
  };

  const sidebarItems: SidebarItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <MdDashboard className="w-4 h-4" /> },
    { id: "categories", label: "Categories", icon: <MdCategory className="w-4 h-4" /> },
    { id: "books", label: "Books", icon: <MdLibraryBooks className="w-4 h-4" /> },
    { id: "readers", label: "Readers", icon: <MdPeople className="w-4 h-4" /> },
    { id: "lendings", label: "Lendings", icon: <MdShoppingCart className="w-4 h-4" /> },
    { id: "overdues", label: "Overdues", icon: <MdWarning className="w-4 h-4 text-red-500" /> },
    { id: "audit", label: "Audit Logs", icon: <MdHistory className="w-4 h-4 text-yellow-400" /> },
  ];

  return (
      <div className="relative bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900 text-white w-64 min-h-screen p-6 flex flex-col justify-between overflow-hidden rounded-3xl shadow-2xl">
        {/* Background decorative gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-blue-950 to-purple-900 rounded-3xl -z-10" />
        <div className="absolute top-20 left-16 w-32 h-32 rounded-full bg-indigo-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-24 right-12 w-20 h-20 rounded-full bg-purple-600/25 blur-2xl animate-pulse" />

        <div className="relative z-10">
          <nav>
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => (
                  <li key={item.id} style={{ animationDelay: `${index * 0.12}s` }}>
                    <button
                        onClick={() => handleItemClick(item.id)}
                        className={`group relative w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-transform duration-300 overflow-hidden 
                      ${
                            activeItem === item.id
                                ? "bg-gradient-to-r from-blue-500 to-indigo-700 text-white shadow-lg shadow-blue-700 scale-105"
                                : "text-gray-300 hover:bg-white/10 hover:text-white"
                        } hover:scale-102 text-sm leading-tight`}
                    >
                      {activeItem === item.id && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/25 to-indigo-700/25 blur-sm rounded-lg"></div>
                      )}
                      <span
                          className={`relative flex-shrink-0 p-2 rounded-lg shadow-md transition-colors duration-300
                      ${
                              activeItem === item.id
                                  ? "bg-white/20 shadow-blue-500"
                                  : "group-hover:bg-white/20"
                          }`}
                      >
                    {item.icon}
                  </span>
                      <span className="relative font-medium capitalize group-hover:translate-x-1 transition-transform duration-300">
                    {item.label}
                  </span>
                      <div
                          className={`absolute right-3 w-2 h-2 rounded-full transition-all duration-300
                      ${
                              activeItem === item.id
                                  ? "bg-white animate-pulse"
                                  : "bg-transparent group-hover:bg-white/50"
                          }`}
                      ></div>
                      {activeItem === item.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full"></div>
                      )}
                    </button>
                  </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="relative z-10 mt-8 border-t border-white/20 pt-6">
          <button
              onClick={() => {
                setActiveItem("profile");
                navigate("/dashboard/profile");
              }}
              className={`group relative w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-transform duration-300 overflow-hidden hover:scale-102 text-sm leading-tight
            ${
                  activeItem === "profile"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-700 text-white shadow-lg shadow-blue-700 scale-105"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
          >
            {activeItem === "profile" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/25 to-indigo-700/25 blur-sm rounded-lg"></div>
            )}
            <span
                className={`relative flex-shrink-0 p-2 rounded-lg shadow-md transition-colors duration-300
              ${activeItem === "profile" ? "bg-white/20 shadow-blue-500" : "group-hover:bg-white/20"}`}
            >
            <MdPerson className="w-4 h-4" />
          </span>
            <span className="relative font-medium group-hover:translate-x-1 transition-transform duration-300">
            Profile
          </span>
            <div
                className={`absolute right-3 w-2 h-2 rounded-full transition-all duration-300 ${
                    activeItem === "profile"
                        ? "bg-white animate-pulse"
                        : "bg-transparent group-hover:bg-white/50"
                }`}
            ></div>
            {activeItem === "profile" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full"></div>
            )}
          </button>
        </div>
      </div>
  );
};

export default Sidebar;
