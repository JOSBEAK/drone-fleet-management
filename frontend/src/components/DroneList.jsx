import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Battery, ChevronLeft, ChevronRight } from "lucide-react";
import { DroneModal } from "./DroneModal";

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

const BatteryStatus = React.memo(({ status }) => {
  const percentage = parseInt(status);
  let color = "text-green-500";
  if (percentage <= 20) color = "text-red-500";
  else if (percentage <= 50) color = "text-yellow-500";

  return (
    <div className="flex items-center">
      <Battery className={`w-5 h-5 mr-1 ${color}`} />
      <span className="text-sm font-medium dark:text-gray-300">{status}</span>
    </div>
  );
});

export default function DroneList({
  drones,
  onDroneSelect,
  isDarkMode,
  fetchDrones,
  currentPage,
  totalPages,
}) {
  const [selectedDrone, setSelectedDrone] = React.useState(null);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchDrones(newPage);
    }
  };

  const handleDroneClick = (drone) => {
    setSelectedDrone(drone);
    if (onDroneSelect) {
      onDroneSelect(drone);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {drones.map((drone) => (
          <motion.div
            key={drone.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl"
            onClick={() => handleDroneClick(drone)}
          >
            <img
              src={
                drone.image ||
                "https://scenesafe.co.uk/cdn/shop/products/Website_Image_Coming_Soon_9d4b0bca-9f9f-4193-932e-b13e380db784_1000x1000.jpg?v=1573128724"
              }
              alt={drone.id}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
                {drone.id}
              </h3>
              <div className="flex justify-between items-center">
                <Badge status={drone.status} />
                <BatteryStatus status={drone.battery_status} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full flex items-center ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            } transition duration-200 shadow`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full flex items-center ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            } transition duration-200 shadow`}
          >
            Next
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedDrone && (
          <DroneModal
            drone={selectedDrone}
            onClose={() => setSelectedDrone(null)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
