import React from "react";
import {
  MdBook,
  MdPerson,
  MdAssignmentReturn,
  MdWarning,
  MdLibraryBooks,
} from "react-icons/md";

type ActivityType = "lend" | "return" | "reader" | "overdue" | "book";

interface RecentActivityProps {
  activities: {
    type: "LEND" | "RETURN" | "READER" | "BOOK" | "OVERDUE"; // raw from backend
    message: string;
    timestamp: string; // ISO string from backend
  }[];
}

// Map backend activity types (uppercase) to lowercase for this UI component
const mapActivityType = (type: string): ActivityType => {
  switch (type.toUpperCase()) {
    case "LEND":
      return "lend";
    case "RETURN":
      return "return";
    case "READER":
      return "reader";
    case "OVERDUE":
      return "overdue";
    case "BOOK":
      return "book";
    default:
      return "lend"; // default fallback
  }
};

const getIcon = (type: ActivityType) => {
  switch (type) {
    case "lend":
      return (
          <MdBook className="text-indigo-400 w-7 h-7 bg-indigo-900/20 rounded-lg p-1 shadow-inner" />
      );
    case "return":
      return (
          <MdAssignmentReturn className="text-green-400 w-7 h-7 bg-green-900/20 rounded-lg p-1 shadow-inner" />
      );
    case "reader":
      return (
          <MdPerson className="text-blue-400 w-7 h-7 bg-blue-900/20 rounded-lg p-1 shadow-inner" />
      );
    case "overdue":
      return (
          <MdWarning className="text-red-400 w-7 h-7 bg-red-900/20 rounded-lg p-1 shadow-inner" />
      );
    case "book":
      return (
          <MdLibraryBooks className="text-purple-400 w-7 h-7 bg-purple-900/20 rounded-lg p-1 shadow-inner" />
      );
    default:
      return null;
  }
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
      <div className="bg-gradient-to-br from-indigo-800 via-blue-900 to-purple-900 rounded-xl shadow-2xl p-6">
        <h2 className="text-lg font-semibold text-indigo-300 mb-6">Recent Activity</h2>
        <ul className="space-y-5 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-900">
          {activities.map((activity, index) => {
            const type = mapActivityType(activity.type);
            const timeStr = new Date(activity.timestamp).toLocaleString();

            return (
                <li key={index} className="flex items-start space-x-4">
                  <div>{getIcon(type)}</div>
                  <div>
                    <p className="text-white text-sm">{activity.message}</p>
                    <p className="text-indigo-300 text-xs mt-0.5">{timeStr}</p>
                  </div>
                </li>
            );
          })}
        </ul>
      </div>
  );
};

export default RecentActivity;
