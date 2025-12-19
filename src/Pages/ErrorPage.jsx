import React from 'react';
import { Link } from 'react-router';
import ErrorImg from '../assets/error-404.png';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-lg text-center space-y-6">
        <img src={ErrorImg} alt="Page not found" className="w-56 sm:w-72 md:w-96 mx-auto" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pink-600">
          ⚠️ Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          The page you are looking for is not available.
        </p>

        <Link to="/" className="inline-block">
          <button className="inline-flex items-center justify-center px-5 py-3 rounded-md text-white font-medium bg-gradient-to-r from-pink-600 to-pink-500 hover:opacity-95 transition">
            Go Back!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
