import React, { useState } from "react";

const RatingBar = ({ rating, tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Handle mouse events for tooltip
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);
  const handleMouseMove = (event) => {
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  if (rating === -1 || rating === undefined) {
    return (
      <div
        className="w-full flex bg-gray-300 p-1 rounded-lg overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="h-6 bg-black text-white text-center w-full">N/A</div>
        {showTooltip && (
          <div
            style={{
              position: "fixed",
              left: tooltipPosition.x + 15,
              top: tooltipPosition.y + 15,
              backgroundColor: "rgba(59, 59, 59, 0.85)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "6px",
              zIndex: 50,
            }}
          >
            {tooltipText}
          </div>
        )}
      </div>
    );
  }

  // Calculate widths based on the rating
  const redWidth = `${rating * 10}%`;
  const blueWidth = `${100 - rating * 10}%`;

  return (
    <div
      className="w-full flex bg-gray-300 p-1 rounded-lg overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        className="h-6 bg-red-500 text-white text-center"
        style={{ width: redWidth }}
      >
        {rating}/10
      </div>
      <div
        className="h-6 bg-blue-500 text-white text-center"
        style={{ width: blueWidth }}
      >
        {10 - rating}/10
      </div>
      {showTooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltipPosition.x + 15,
            top: tooltipPosition.y + 15,
            backgroundColor: "rgba(59, 59, 59, 0.85)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "6px",
            zIndex: 50,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default RatingBar;
