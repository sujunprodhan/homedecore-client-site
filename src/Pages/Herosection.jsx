import React from 'react';
import { motion } from 'framer-motion';

const Herosection = () => {
  return (
    <section className="bg-gradient-to-r from-pink-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Transform Your Home With
            <span className="text-[#E92C8F]"> Elegant Decoration</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            We provide premium home decoration services to make your space beautiful, stylish, and
            comfortable.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 bg-[#E92C8F] text-white font-semibold rounded-lg shadow-lg hover:bg-[#d92381]"
          >
            Book Decoration Service
          </motion.button>
        </motion.div>

        {/* Image / Visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="https://i.ibb.co.com/33xb487/porject-image-10.jpg"
            alt="Home Decoration"
            className="w-full rounded-2xl shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Herosection;
