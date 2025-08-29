import React from "react";
import { MdPeople, MdLibraryBooks, MdBook, MdWarning } from "react-icons/md";

interface DashboardStatsProps {
  totalCustomers: number;
  totalItems: number;
  totalOrders: number;
  totalRevenue: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
                                                         totalCustomers,
                                                         totalItems,
                                                         totalOrders,
                                                         totalRevenue,
                                                       }) => {
  const stats = [
    {
      label: "Total Readers",
      value: totalCustomers,
      icon: (
          <MdPeople className="text-blue-400 w-7 h-7 bg-blue-900/20 p-1 rounded-lg shadow-inner" />
      ),
    },
    {
      label: "Total Books",
      value: totalItems,
      icon: (
          <MdLibraryBooks className="text-purple-400 w-7 h-7 bg-purple-900/20 p-1 rounded-lg shadow-inner" />
      ),
    },
    {
      label: "Books Lent",
      value: totalOrders,
      icon: (
          <MdBook className="text-green-400 w-7 h-7 bg-green-900/20 p-1 rounded-lg shadow-inner" />
      ),
    },
    {
      label: "Overdue Books",
      value: totalRevenue,
      icon: (
          <MdWarning className="text-red-400 w-7 h-7 bg-red-900/20 p-1 rounded-lg shadow-inner" />
      ),
    },
  ];

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
            <div
                key={idx}
                className="bg-gradient-to-br from-indigo-800 via-blue-900 to-purple-900 p-6 rounded-xl shadow-2xl flex items-center space-x-5 hover:scale-[1.03] transition-transform cursor-default"
            >
              {stat.icon}
              <div>
                <p className="text-indigo-300 text-sm font-semibold">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
            </div>
        ))}
      </div>
  );
};

export default DashboardStats;
