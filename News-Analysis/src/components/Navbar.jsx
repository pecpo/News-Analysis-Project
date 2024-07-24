import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-700 p-4">
      <div className="max-w-full w-full mx-auto flex justify-between items-center px-4">
        <div className="text-white text-2xl font-bold">
          <NavLink to="/">Brand</NavLink>
        </div>
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <NavLink to="/" className="text-white">Home</NavLink>
          <NavLink to="/about" className="text-white">About</NavLink>
          <NavLink to="/services" className="text-white">Services</NavLink>
          <NavLink to="/contact" className="text-white">Contact</NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/login" className="text-white">Login/Signup</NavLink>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <NavLink to="/" className="block text-white px-2 py-1">Home</NavLink>
        <NavLink to="/about" className="block text-white px-2 py-1">About</NavLink>
        <NavLink to="/services" className="block text-white px-2 py-1">Services</NavLink>
        <NavLink to="/contact" className="block text-white px-2 py-1">Contact</NavLink>
        <NavLink to="/login" className="block text-white px-2 py-1">Login/Signup</NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
