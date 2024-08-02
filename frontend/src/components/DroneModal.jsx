import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Battery,
  Clock,
  MapPin,
  Target,
  BarChart2,
  Hammer,
  X,
} from "lucide-react";

const statusColors = {
  Available:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In-flight": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Maintenance:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Offline: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  Charging:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
};

const Badge = React.memo(({ status }) => {
  const colorClass = statusColors[status] || statusColors.default;
  return (
    <span
      className={`${colorClass} text-xs font-medium px-2.5 py-0.5 rounded-full`}
    >
      {status}
    </span>
  );
});

const StatItem = React.memo(({ icon, label, value }) => (
  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
    {icon}
    <div className="ml-3">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </div>
      <div className="text-lg font-semibold dark:text-white">{value}</div>
    </div>
  </div>
));

const MaintenanceLog = React.memo(({ log }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex items-center mb-2">
      <Hammer className="w-5 h-5 mr-2 text-blue-500" />
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {log.date}
      </span>
    </div>
    <p className="text-sm mb-1 text-gray-600 dark:text-gray-400">
      <strong>Description:</strong> {log.description}
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      <strong>Technician:</strong> {log.technician}
    </p>
  </div>
));

export const DroneModal = React.memo(({ drone, onClose, isDarkMode }) => {
  const stats = useMemo(
    () => [
      {
        icon: <Battery className="w-6 h-6 text-blue-500" />,
        label: "Battery",
        value: drone.battery_status,
      },
      {
        icon: <Clock className="w-6 h-6 text-green-500" />,
        label: "Flight Hours",
        value: drone.flight_hours,
      },
      {
        icon: <MapPin className="w-6 h-6 text-red-500" />,
        label: "Latitude",
        value: drone.last_known_location[0].toFixed(6),
      },
      {
        icon: <MapPin className="w-6 h-6 text-orange-500" />,
        label: "Longitude",
        value: drone.last_known_location[1].toFixed(6),
      },
      {
        icon: <Target className="w-6 h-6 text-purple-500" />,
        label: "Current Mission",
        value: drone.current_mission,
      },
    ],
    [drone]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`bg-white dark:bg-gray-900 rounded-xl p-6 max-w-4xl w-full shadow-2xl ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{drone.id}</h2>
          <div className="flex items-center space-x-4">
            <Badge status={drone.status} />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition duration-200"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={
                drone.image ||
                "https://scenesafe.co.uk/cdn/shop/products/Website_Image_Coming_Soon_9d4b0bca-9f9f-4193-932e-b13e380db784_1000x1000.jpg?v=1573128724"
              }
              alt={drone.id}
              className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
            />
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <StatItem key={index} {...stat} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <BarChart2 className="w-6 h-6 mr-2 text-blue-500" />
              Maintenance Logs
            </h3>
            <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
              {drone.maintenance_logs.map((log, index) => (
                <MaintenanceLog key={index} log={log} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

DroneModal.displayName = "DroneModal";
