import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin, isDarkMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const validateInput = (input) => {
    return input.replace(/<[^>]*>/g, "").trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const sanitizedUsername = validateInput(username);
    const sanitizedPassword = validateInput(password);

    if (sanitizedUsername.length < 3 || sanitizedPassword.length < 6) {
      setError(
        "Username must be at least 3 characters and password must be at least 6 characters."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: sanitizedUsername,
          password: sanitizedPassword,
        }),
      });
      const data = await response.json();
      if (data.success) {
        onLogin();
        navigate("/drones");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } w-full max-w-md`}
      >
        <h2 className="mb-6 text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
              required
              minLength={3}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
              required
              minLength={6}
            />
          </div>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 text-white transition duration-300 ease-in-out bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
