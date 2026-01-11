import { NavLink } from "react-router";
import logo from "../../../assets/gtLogo.PNG";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#FEEAE6] dark:bg-[#1a1a1a] text-[#442C2E] dark:text-[#FEEAE6] py-12 border-t dark:border-gray-800 transition-colors duration-300 -mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand & About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="GarmentTrack Logo" className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700 shadow-sm" />
            <h2 className="text-2xl font-bold tracking-tight">GarmentTrack</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-400">
            Smart solution for garment production tracking, order management, and workflow efficiency. 
            Empowering the industry with transparency.
          </p>
        </div>

        {/* Column 2: Useful Links */}
        <div>
          <h3 className="text-lg font-bold mb-5 border-b-2 border-[#442C2E] dark:border-lime-500 w-fit pb-1">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li>
              <NavLink to="/" className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-products" className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors">All Products</NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors">Contact</NavLink>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-5 border-b-2 border-[#442C2E] dark:border-lime-500 w-fit pb-1">
            Reach Us
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-lime-600 dark:text-lime-400" />
              <span>support@garmenttrack.com</span>
            </li>
            <li className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-lime-600 dark:text-lime-400" />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-lime-600 dark:text-lime-400" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Social Links & Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-5 border-b-2 border-[#442C2E] dark:border-lime-500 w-fit pb-1">
            Follow Us
          </h3>
          <div className="flex gap-4 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-[#2a2a2a] p-3 rounded-full shadow-md hover:scale-110 transition-transform text-blue-600">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-[#2a2a2a] p-3 rounded-full shadow-md hover:scale-110 transition-transform text-sky-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-[#2a2a2a] p-3 rounded-full shadow-md hover:scale-110 transition-transform text-blue-700">
              <FaLinkedin size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-white dark:bg-[#2a2a2a] p-3 rounded-full shadow-md hover:scale-110 transition-transform text-pink-500">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="mt-12 pt-6 border-t border-[#442C2E]/10 dark:border-gray-800 text-center">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-500">
          © {new Date().getFullYear()} <span className="text-[#442C2E] dark:text-[#FEEAE6] font-bold">GarmentTrack Inc.</span> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;