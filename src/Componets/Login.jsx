import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login to <span className="text-[#E92C8F]">Home Decore</span>
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Welcome back! Please login to your account
        </p>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E92C8F]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E92C8F]"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#E92C8F]"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash /> }
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#E92C8F] text-white font-semibold rounded-lg hover:bg-[#d92381] transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?
          <span className="text-[#E92C8F] cursor-pointer ml-1">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
