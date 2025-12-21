import React from 'react';
import { FaUsers, FaTools, FaBook, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import BrandLogo from './Brandlogo';


const About = () => {
  return (
    <div className="w-11/12 mx-auto py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-pink-600 mb-4">About Home Decor</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Home Decor is your trusted platform for home decoration services. We connect skilled
          decorators with users for seamless booking, secure payment, and high-quality service.
        </p>
      </div>

      {/* Highlights / Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-xl shadow-lg text-center"
        >
          <FaUsers className="text-5xl text-pink-600 mx-auto mb-4" />
          <h3 className="font-semibold text-2xl mb-2">Expert Decorators</h3>
          <p className="text-gray-500 text-sm">
            Professional decorators with experience to bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-xl shadow-lg text-center"
        >
          <FaTools className="text-5xl text-pink-600 mx-auto mb-4" />
          <h3 className="font-semibold text-2xl mb-2">Wide Range of Services</h3>
          <p className="text-gray-500 text-sm">
            Manage all your decoration needs from one platform—booking, updates, and payments.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-xl shadow-lg text-center"
        >
          <FaBook className="text-5xl text-pink-600 mx-auto mb-4" />
          <h3 className="font-semibold text-2xl mb-2">Easy Booking System</h3>
          <p className="text-gray-500 text-sm">
            Book services in just a few clicks with secure payment options.
          </p>
        </motion.div>
      </div>

      {/* Brand Marquee */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Our Partners</h2>
        <BrandLogo></BrandLogo>
      </div>
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <FaBook className="text-4xl text-pink-600 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Choose Service</h3>
            <p className="text-gray-500 text-sm">Select the decoration service you need.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <FaUsers className="text-4xl text-pink-600 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Select Decorator</h3>
            <p className="text-gray-500 text-sm">Choose a skilled decorator from our team.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <FaHandshake className="text-4xl text-pink-600 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Confirm & Pay</h3>
            <p className="text-gray-500 text-sm">Securely confirm your booking and pay online.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <FaTools className="text-4xl text-pink-600 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Enjoy Service</h3>
            <p className="text-gray-500 text-sm">Sit back while our decorators handle the work.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
