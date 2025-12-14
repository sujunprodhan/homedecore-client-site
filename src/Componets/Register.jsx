import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Join <span className="text-[#E92C8F] font-semibold">Home Decore</span> today
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E92C8F]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E92C8F]"
            />
          </div>

          {/* Password with Eye Icon */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E92C8F]"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#E92C8F]"
              >
                {showPassword ? <FaEye /> :<FaEyeSlash />}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#E92C8F] text-white font-semibold rounded-lg hover:bg-[#d92381] transition"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <button className="w-full flex items-center justify-center gap-3 py-3 border rounded-lg hover:bg-gray-100 transition">
          <FcGoogle size={22} />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <span className="text-[#E92C8F] cursor-pointer ml-1">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
