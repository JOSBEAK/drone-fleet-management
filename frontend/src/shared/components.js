import React from "react";

export const statusColors = {
  Available: "bg-green-500",
  "In-flight": "bg-blue-500",
  Maintenance: "bg-yellow-500",
  Offline: "bg-red-500",
  Charging: "bg-purple-500",
  default: "bg-gray-500",
};

export function Badge({ status }) {
  const colorClass = statusColors[status] || statusColors.default;
  return (
    <span
      className={`${colorClass} text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}
    >
      {status}
    </span>
  );
}

export function StatItem({ icon, label, value }) {
  return (
    <div className="flex items-center p-3 bg-gray-100 rounded-lg">
      {icon}
      <div className="ml-3">
        <div className="text-sm font-medium text-gray-500">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}
