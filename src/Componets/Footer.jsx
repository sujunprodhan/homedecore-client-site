import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#E92C8F] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt /> +880 1234-567890
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> support@example.com
          </p>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Working Hours</h3>
          <p>Saturday – Thursday</p>
          <p>9:00 AM – 8:00 PM</p>
          <p>Friday: Closed</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 bg-white text-[#E92C8F] rounded-full hover:scale-110 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-white text-[#E92C8F] rounded-full hover:scale-110 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-white text-[#E92C8F] rounded-full hover:scale-110 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center py-4 bg-[#d92381] text-sm">
        © {new Date().getFullYear()} Your Business Name. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
