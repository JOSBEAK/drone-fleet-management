import React from "react";

export default function MaintenanceLogs({ logs }) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Maintenance Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
            <p>
              <strong>Date:</strong> {log.date}
            </p>
            <p>
              <strong>Description:</strong> {log.description}
            </p>
            <p>
              <strong>Technician:</strong> {log.technician}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
