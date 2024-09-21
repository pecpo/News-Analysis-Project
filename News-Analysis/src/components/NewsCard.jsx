/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({
  image,
  title,
  description,
  link,
  linkText = "Read More",
  bgColor = "bg-black",
  hoverBgColor = "hover:bg-gray-700",
}) => {
  // Truncate description to 100 characters
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-w-[350px] max-w-[350px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 mb-4 text-sm">
          {truncateDescription(description, 100)}
        </p>
        <Link
          to={link}
          className={`inline-block ${bgColor} text-white rounded-lg px-3 py-2 ${hoverBgColor} text-sm`}
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
