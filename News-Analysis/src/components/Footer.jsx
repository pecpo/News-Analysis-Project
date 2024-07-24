import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 mt-8">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <Link to="/" className="flex flex-shrink-0 items-center mr-4">
              <img src={logo} alt="WhichWing" className="h-10" />
              <span className="hidden md:block text-gray-600 text-2xl font-bold ml-2">WhichWing</span>
            </Link>
          </div>
          <div className="w-full md:flex-1 md:flex justify-center space-x-4 mb-4 md:mb-0">
            <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
            <Link to="/politics" className="text-gray-600 hover:text-gray-800">Politics</Link>
            <Link to="/business" className="text-gray-600 hover:text-gray-800">Business</Link>
            <Link to="/technology" className="text-gray-600 hover:text-gray-800">Technology</Link>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex space-x-4">
              <Link to="/register" className="text-gray-600 hover:text-gray-800">Register</Link>
              <Link to="/signin" className="text-gray-600 hover:text-gray-800">Sign In</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-8">
          <div className="w-full md:flex-1 md:flex justify-center space-x-8 mb-4 md:mb-0">
            <Link to="/" className="text-gray-600 hover:text-gray-800">Terms of Use</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800">About</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800">Cookies</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800">Accessibility Help</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800">Contact</Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800">Advertise with us</Link>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800"><FaFacebook /></Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800"><FaTwitter /></Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800"><FaInstagram /></Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800"><FaLinkedin /></Link>
            <Link to="/" className="text-gray-600 hover:text-gray-800"><FaYoutube /></Link>
          </div>
          <div className="text-center text-gray-600 mt-8">
            <p>© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
