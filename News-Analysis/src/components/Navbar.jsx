import logo from "../assets/images/logo.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-700 p-4 fixed top-0 w-full z-50">
      <div className="max-w-full w-full mx-auto flex justify-between items-center px-4">
        <div className="text-white text-2xl font-bold">
          <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
            <img className="h-10 w-auto" src={logo} alt="WhichWing" />
            <span className="hidden md:block text-white text-2xl font-bold ml-2">
              WhichWing
            </span>
          </NavLink>
        </div>
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <NavLink to="/" className="text-white">
            Home
          </NavLink>
          <NavLink to="/world" className="text-white">
            World
          </NavLink>
          <NavLink to="/north-america" className="text-white">
            North America
          </NavLink>
          <NavLink to="/europe" className="text-white">
            Europe
          </NavLink>
          <NavLink to="/south-america" className="text-white">
            South America
          </NavLink>
          <NavLink to="/asia" className="text-white">
            Asia
          </NavLink>
          <NavLink to="/africa" className="text-white">
            Africa
          </NavLink>
          <NavLink to="/oceania" className="text-white">
            Oceania
          </NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-4">
        <NavLink to="/register" className="text-white">
            Register
          </NavLink>
          <NavLink to="/signin" className="text-white">
            Sign In
          </NavLink>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <NavLink to="/" className="block text-white px-2 py-1">
          Home
        </NavLink>
        <NavLink to="/north-America" className="block text-white px-2 py-1">
          North-America
        </NavLink>
        <NavLink to="/europe" className="block text-white px-2 py-1">
          Europe
        </NavLink>
        <NavLink to="/south-america" className="block text-white px-2 py-1">
          South-america
        </NavLink>
        <NavLink to="/register" className="block text-white px-2 py-1">
          Register
        </NavLink>
        <NavLink to="/signin" className="block text-white px-2 py-1">
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
