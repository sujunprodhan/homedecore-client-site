import React, { useEffect, useState } from 'react';
import Herosection from './Herosection';
import axios from 'axios';
import { Link } from 'react-router';
import Marquee from 'react-fast-marquee';

const Home = () => {
  const [services, setServices] = useState([]);
  const [review, setReview] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 3;

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    axios
      .get('https://homedecore-server-site.vercel.app/homeservice')
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* ================= FETCH REVIEWS FROM PUBLIC ================= */
  useEffect(() => {
    fetch('/review.json')
      .then((res) => res.json())
      .then((data) => setReview(data))
      .catch((err) => console.log(err));
  }, []);

  /* ================= PAGINATION ================= */
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(services.length / servicesPerPage);

  /* ================= HELPERS ================= */
  const shortenDescription = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : text;
  };

  const shortenReview = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : text;
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <Herosection />

      {/* ================= SERVICES ================= */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {currentServices.map((service) => (
            <div
              key={service._id}
              className="border-2 border-pink-500 rounded-xl shadow hover:shadow-lg transition p-4 bg-white"
            >
              <img
                src={service.image}
                className="h-48 w-full object-cover rounded"
                alt={service.name}
              />
              <h3 className="text-xl font-semibold mt-3">{service.name}</h3>
              <p className="text-gray-500 mt-1">{shortenDescription(service.description)}</p>
              <p className="font-bold text-pink-600 mt-1">৳ {service.price}</p>

              <Link
                to={`/servicedetails/${service._id}`}
                className="block mt-4 text-center bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-4 py-2 rounded-lg border-2 ${
                currentPage === num + 1
                  ? 'bg-pink-600 text-white border-pink-600'
                  : 'border-pink-500 text-pink-600 hover:bg-pink-50'
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/services"
            className="inline-block bg-gradient-to-r from-pink-500 to-pink-700 text-white py-3 px-6 rounded-lg font-semibold"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-pink-600">What Our Clients Say</h2>
        </div>

        {/* Marquee */}
        <Marquee speed={45} pauseOnHover gradient gradientColor={[255, 240, 246]}>
          {review.map((r, index) => (
            <div
              key={index}
              className="mx-6 w-[340px] bg-white border border-pink-200 rounded-2xl shadow-md p-6"
            >
              {/* User */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={r.user_photoURL}
                  alt={r.userName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{r.userName}</h4>
                  <p className="text-sm text-gray-500">{r.location}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex mb-3">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - r.stars }).map((_, i) => (
                  <span key={i} className="text-gray-300 text-lg">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-600 italic">“{shortenReview(r.review)}”</p>
            </div>
          ))}
        </Marquee>
      </section>
    </div>
  );
};

export default Home;
