import React, { useEffect, useState } from 'react';
import Herosection from './Herosection';
import axios from 'axios';
import { Link } from 'react-router';

const Home = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([
    {
      name: 'John Doe',
      comment: 'Excellent service! Highly recommend.',
    },
    {
      name: 'Jane Smith',
      comment: 'Decor team did a fantastic job for my event.',
    },
    {
      name: 'Ali Khan',
      comment: 'Professional and timely. Loved the decoration.',
    },
  ]);

  useEffect(() => {
    // fetch 3 latest services for homepage
    axios
      .get('http://localhost:3000/homeservice')
      .then((res) => setServices(res.data.slice(0, 3)))
      .catch((err) => console.log(err));
  }, []);

  // Helper function to shorten description to 20 words
  const shortenDescription = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= 20) return text;
    return words.slice(0, 20).join(' ') + '...';
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <Herosection />

      {/* 🔹 Services Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="border-2 border-pink-500 rounded-xl shadow hover:shadow-lg transition p-4"
            >
              <img
                src={service.image}
                className="h-48 w-full object-cover rounded"
                alt={service.name}
              />
              <h3 className="text-xl font-semibold mt-3">{service.name}</h3>
              <p className="text-gray-500 mt-1">{shortenDescription(service.description)}</p>
              <p className="font-bold text-pink-600 mt-1">৳ {service.price}</p>

              {/* 🔹 View Details button for individual service */}
              <Link
                to={`/servicedetails/${service._id}`}
                className="block mt-4 text-center bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* 🔹 View All Services button below cards */}
        <div className="text-center mt-6">
          <Link
            to="/services"
            className="inline-block bg-gradient-to-r from-pink-500 to-pink-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-800 transition"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* 🔹 Client Reviews Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Client Reviews</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border-2 border-pink-500 rounded-xl shadow hover:shadow-lg transition p-6 bg-white"
            >
              <p className="text-gray-700 italic">"{review.comment}"</p>
              <h4 className="mt-4 font-semibold text-pink-600">{review.name}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
