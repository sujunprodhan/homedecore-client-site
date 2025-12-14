import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#E92C8F] text-white flex items-center justify-center font-bold">
            HD
          </div>
          <span className="text-xl font-semibold text-gray-800">
            Home <span className="text-[#E92C8F]">Decore</span>
          </span>
        </Link>

        {/* Navigation Menu */}
        <div className="flex items-center gap-8 font-medium text-gray-700">
          <Link className="hover:text-[#E92C8F]" to="/">
            Home
          </Link>
          <Link className="hover:text-[#E92C8F]" to="/services">
            Services
          </Link>
          <Link className="hover:text-[#E92C8F]" to="/about">
            About
          </Link>
          <Link className="hover:text-[#E92C8F]" to="/contact">
            Contact
          </Link>
          <Link className="hover:text-[#E92C8F]" to="/login">
            Log in
          </Link>
          <Link className="hover:text-[#E92C8F]" to="/register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
