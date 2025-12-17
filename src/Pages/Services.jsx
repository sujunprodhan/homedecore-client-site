import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router';

const Services = () => {
  const bookingServices = useLoaderData();

  // filter states
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  // filter logic
  const filteredServices = bookingServices.filter((service) => {
    return (
      service.name.toLowerCase().includes(search.toLowerCase()) &&
      (type ? service.serviceType === type : true) &&
      (min ? service.price >= min : true) &&
      (max ? service.price <= max : true)
    );
  });

  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Our Decoration Services</h2>

      {/* 🔍 Filter Section */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search service name"
          className="border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="border p-2 rounded" onChange={(e) => setType(e.target.value)}>
          <option value="">All Service Types</option>
          <option value="Consultation">Consultation</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Event Decor">Event Decor</option>
        </select>

        <input
          type="number"
          placeholder="Min Budget"
          className="border p-2 rounded"
          onChange={(e) => setMin(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Budget"
          className="border p-2 rounded"
          onChange={(e) => setMax(e.target.value)}
        />
      </div>

      {/* 🧱 Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredServices.length === 0 && (
          <p className="text-center col-span-3 text-gray-500">No services found</p>
        )}

        {filteredServices.map((service, index) => (
          <div key={index} className="border rounded-xl shadow hover:shadow-lg transition p-4">
            <img
              src={service.image}
              className="h-48 w-full object-cover rounded"
            />

            <h3 className="text-xl font-semibold mt-3">{service.name}</h3>

            <p className="text-gray-500">{service.serviceType}</p>

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
    </div>
  );
};

export default Services;
