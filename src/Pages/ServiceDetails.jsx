import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';

const ServiceDetails = () => {
  const service = useLoaderData(); 
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!service) {
    return <p className="text-center mt-20 text-red-500 text-xl">Service not found</p>;
  }

const onSubmit = async (data) => {
  const bookingInfo = {
    serviceName: service?.name || '',
    serviceImage: service?.image || '',
    serviceType: service?.serviceType || '',
    price: service?.price || 0,
    userName: user?.displayName || '',
    email: user?.email || '',
    bookingDate: data.date,
    location: data.location,
  };

  try {
    const res = await fetch('http://localhost:3000/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(bookingInfo),
    });

    const result = await res.json();

    if (result.insertedId) {
      alert('Booking confirmed!');
      setOpen(false);
      reset();
      navigate('/dashboard/my-booking')
    }
  } catch (error) {
    console.error(error);
    alert('Booking failed');
  }
};
  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Service Image */}
      <img
        src={service?.image || '/placeholder.png'}
        className="w-full h-[420px] object-cover rounded-xl"
      />

      {/* Service Info */}
      <div className="mt-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-4xl font-bold">{service?.name || 'Service Name'}</h2>
          <p className="text-gray-500 mt-2">{service?.serviceType || 'Service Type'}</p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            {service?.description || 'No description available.'}
          </p>
        </div>

        {/* Booking Card */}
        <div className="border rounded-xl p-6 shadow">
          <p className="text-3xl font-bold text-pink-600">৳ {service?.price || 0}</p>
          <button
            onClick={() => (user ? setOpen(true) : alert('Please login to book this service'))}
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4">Confirm Booking</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input
                readOnly
                {...register('userName')}
                defaultValue={user?.displayName || ''}
                className="w-full border px-3 py-2 rounded bg-gray-100"
              />

              <input
                readOnly
                {...register('email')}
                defaultValue={user?.email || ''}
                className="w-full border px-3 py-2 rounded bg-gray-100"
              />

              <input
                type="text"
                readOnly
                {...register('serviceName')}
                defaultValue={service?.name || ''}
                className="w-full border px-3 py-2 rounded bg-gray-100"
              />

              <input
                type="date"
                {...register('date', { required: 'Booking date is required' })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

              <input
                type="text"
                {...register('location', { required: 'Location is required' })}
                placeholder="Event / Home Location"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

              <div className="flex gap-3 mt-4">
                <button type="submit" className="flex-1 bg-pink-600 text-white py-2 rounded">
                  Confirm
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                  className="flex-1 border py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
