import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import ContactImg from '../assets/contactimage.jpg';

const Contact = () => {
  const { user } = useAuth();
  

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue('name', );
      setValue('email',);
    }
  }, []);

  const onSubmit = (data) => {
    alert('Message sent successfully!', data);
    reset({
      name: user?.displayName || '',
      email: user?.email || '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="w-11/12 mx-auto py-12">
      <h1 className="text-center text-4xl font-bold text-pink-600 mb-10">Contact Us</h1>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="md:w-1/2">
          <img
            src={ContactImg}
            alt="Contact"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Form */}
        <motion.div
          className="md:w-1/2 bg-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Your Name"
              {...register('name', { required: true })}
              className={`border px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 ${
                user && 'bg-gray-100 cursor-not-allowed'
              }`}
            />
            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}

            {/* Email */}
            <input
              type="email"
              placeholder="Your Email"
              {...register('email', { required: true })}
              className={`border px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 ${
                user && 'bg-gray-100 cursor-not-allowed'
              }`}
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}

            {/* Subject */}
            <input
              type="text"
              placeholder="Subject"
              {...register('subject', { required: true })}
              className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
            {errors.subject && <span className="text-red-500 text-sm">Subject is required</span>}

            {/* Message */}
            <textarea
              rows="5"
              placeholder="Your Message"
              {...register('message', { required: true })}
              className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500"
            />
            {errors.message && <span className="text-red-500 text-sm">Message is required</span>}

            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-pink-700 text-white font-semibold py-3 rounded-lg hover:from-pink-600 hover:to-pink-800 transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-xl text-pink-600">Email Us</h3>
          <p className="text-gray-500">support@homedecor.com</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-xl text-pink-600">Call Us</h3>
          <p className="text-gray-500">+880 1234 567890</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-xl text-pink-600">Visit Us</h3>
          <p className="text-gray-500">123 Home Decor Street, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
