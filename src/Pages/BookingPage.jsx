import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';

const BookingPage = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Booking Data:', data);
    toast.success('Booking request submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-2xl font-semibold mb-6">Book This Service</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                defaultValue={user?.displayName || ''}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                {...register('email', { required: 'Email is required' })}
                defaultValue={user?.email || ''}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Your email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                {...register('phone', { required: 'Phone number is required' })}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="01XXXXXXXXX"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1 font-medium">Preferred Date</label>
              <input
                {...register('date', { required: true })}
                type="date"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                {...register('message')}
                rows="4"
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Any special requirement?"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-[#E92C8F] text-white rounded-lg hover:bg-[#d92381]"
            >
              Confirm Booking
            </button>
          </form>
        </div>
        {/* Service Details */}
        <div className="bg-white rounded-2xl shadow p-6">
          <img
            src="https://i.ibb.co/QjZ1R9P/interior.jpg"
            alt="service"
            className="w-full h-60 object-cover rounded-xl mb-6"
          />

          <h2 className="text-3xl font-bold text-gray-800">Interior Design Consultation</h2>

          <p className="text-gray-600 mt-3">
            Get professional interior design consultation for your home or office. We help you plan
            layout, colors, furniture & decoration.
          </p>

          <div className="mt-6 space-y-2">
            <p>
              <span className="font-semibold">Duration:</span> 60 Minutes
            </p>
            <p>
              <span className="font-semibold">Service Type:</span> Online / On-site
            </p>
            <p className="text-2xl font-bold text-[#E92C8F] mt-4">৳ 2,500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
