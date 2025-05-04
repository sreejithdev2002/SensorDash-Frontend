// CustomTooltip.js
import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white p-2 rounded-md shadow-lg"
        style={{ border: "1px solid #ccc" }}
      >
        <p className="text-sm font-semibold text-gray-700">
          {new Date(label).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: entry.color }}
            ></div>
            <p className="text-sm text-gray-600">
              {entry.name}: {entry.value}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
