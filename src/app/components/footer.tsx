import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="flex justify-between items-center">
          <div className="text-center text-gray-400 mt-4 sm:text-left">
            &copy; {new Date().getFullYear()} Blog Hub. All rights reserved.
          </div>

          <div className="flex space-x-6">
            {/* Social Media Links */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-gray-400 hover:text-blue-600" size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-blue-600" size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-400 hover:text-pink-600" size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-blue-700" size={24} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center text-gray-400 mt-6">
          <a href="/about" className="hover:text-blue-600 mx-4">About Us</a>
          <a href="/contact" className="hover:text-blue-600 mx-4">Contact</a>
          <a href="/privacy" className="hover:text-blue-600 mx-4">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-600 mx-4">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
