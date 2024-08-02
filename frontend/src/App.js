import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import DroneList from "./components/DroneList";

import Navbar from "./components/Navbar";
import "./index.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drones, setDrones] = useState([]);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (isLoggedIn) {
      fetchDrones(currentPage);
    }
  }, [isLoggedIn, currentPage]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const fetchDrones = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5001/api/drones?page=${page}&per_page=12`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch drones");
      }
      const data = await response.json();
      setDrones(data.drones);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleDroneSelect = (drone) => {
    setSelectedDrone(drone);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="mx-auto p-4 dark:bg-gray-900 dark:text-white min-h-screen">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} isDarkMode={isDarkMode} />
        ) : (
          <>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900 dark:text-red-100 dark:border-red-700"
                role="alert"
              >
                {error}
              </div>
            )}
            {loading ? (
              <div className="text-center">
                <div className="spinner dark:border-white"></div>
                <p>Loading drones...</p>
              </div>
            ) : (
              <DroneList
                drones={drones}
                onDroneSelect={handleDroneSelect}
                isDarkMode={isDarkMode}
                fetchDrones={fetchDrones}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
