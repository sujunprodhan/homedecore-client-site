import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router';

const Services = () => {
  const bookingServices = useLoaderData();

  // filter states
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  // helper to shorten description
  const shortenDescription = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : text;
  };

  // filter logic
  const filteredServices = bookingServices.filter((service) => {
    // make sure min and max are numbers
    const minBudget = parseFloat(min) || 0;
    const maxBudget = parseFloat(max) || Number.MAX_VALUE;

    return (
      service.name.toLowerCase().includes(search.toLowerCase()) &&
      (type ? service.serviceType === type : true) &&
      service.price >= minBudget &&
      service.price <= maxBudget
    );
  });

  return (
    <div className="w-11/12 mx-auto py-10">
      {/* 🔹 Page Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-pink-600 mb-2">Our Decoration Services</h2>
        <p className="text-gray-600">
          Total Services: <span className="font-semibold">{bookingServices.length}</span> | Showing:{' '}
          <span className="font-semibold">{filteredServices.length}</span>
        </p>
      </div>

      {/* 🔹 Filter Section */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        <input
          type="text"
          placeholder="Search service name"
          className="border border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Service Types</option>
          <option value="Consultation">Consultation</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Event Decor">Event Decor</option>
        </select>

        <input
          type="number"
          placeholder="Min Budget"
          className="border border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setMin(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Budget"
          className="border border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          onChange={(e) => setMax(e.target.value)}
        />
      </div>

      {/* 🔹 Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredServices.length === 0 && (
          <p className="text-center col-span-3 text-gray-500">No services found</p>
        )}

        {filteredServices.map((service, index) => (
          <div
            key={index}
            className="border-2 border-pink-500 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 p-5 bg-white"
          >
            <img
              src={service.image}
              className="h-48 w-full object-cover rounded-lg"
              alt={service.name}
            />

            <h3 className="text-xl font-semibold mt-3">{service.name}</h3>
            {service.description && (
              <p className="text-gray-500 mt-1">{shortenDescription(service.description)}</p>
            )}

            <p className="text-gray-500 mt-1">{service.serviceType}</p>
            <p className="font-bold text-pink-600 mt-2">৳ {service.price}</p>

            <Link
              to={`/servicedetails/${service._id}`}
              className="block mt-4 text-center bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* 🔹 Add a Design Section */}
      <section className="mt-16 py-10 bg-pink-50 rounded-lg">
        <h3 className="text-2xl font-bold text-center text-pink-600 mb-4">
          Why Choose Our Services?
        </h3>
        <p className="text-center text-gray-700 max-w-3xl mx-auto">
          We provide professional decoration services with high-quality materials and experienced
          teams. Customer satisfaction and unique designs are our top priority. Explore our services
          to find the perfect match for your event or home decor.
        </p>
      </section>
    </div>
  );
};

export default Services;
