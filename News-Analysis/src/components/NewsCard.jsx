/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({
  image,
  title,
  description,
  link,
  linkText,
  bgColor = "bg-black",
  hoverBgColor = "hover:bg-gray-700",
}) => {
  return (
    <div className="p-4">
      <img
        src={image}
        alt={title}
        className="w-full h-32 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{title}</h2>
      <p className="mt-2 mb-4 text-sm">{description}</p>
      <Link
        to={link}
        className={`inline-block ${bgColor} text-white rounded-lg px-3 py-2 ${hoverBgColor} text-sm`}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default NewsCard;
