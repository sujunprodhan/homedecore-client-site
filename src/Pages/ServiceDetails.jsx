import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const ServiceDetails = () => {
  const service = useLoaderData();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch reviews
  const fetchReviews = () => {
    if (!service?._id) return;
    fetch(`https://homedecore-server-site.vercel.app/reviews?serviceId=${service._id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchReviews();
  }, [service?._id]);

  if (!service) {
    return <p className="text-center mt-20 text-red-500 text-xl">Service not found</p>;
  }

  const onSubmitBooking = async (data) => {
    const bookingInfo = {
      serviceId: service._id,
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
      const res = await fetch('https://homedecore-server-site.vercel.app/bookings', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(bookingInfo),
      });

      const result = await res.json();

      if (result.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed!',
          text: 'Your booking has been successfully placed.',
          confirmButtonColor: '#d63384',
        });
        setOpen(false);
        reset();
        navigate('/dashboard/my-booking');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: 'Something went wrong. Please try again.',
        confirmButtonColor: '#d63384',
      });
    }
  };

  const onSubmitReview = async (data) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to submit a review',
        confirmButtonColor: '#d63384',
      });
      return;
    }

    const reviewData = {
      serviceId: service._id,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL || '/placeholder-user.png',
      rating: parseInt(data.rating),
      comment: data.comment,
      createdAt: new Date(),
    };

    try {
      const res = await fetch('https://homedecore-server-site.vercel.app/reviews', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const result = await res.json();
      if (result.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Review Submitted!',
          confirmButtonColor: '#d63384',
        });
        reset();
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Could not submit review',
        confirmButtonColor: '#d63384',
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10 space-y-10">
      {/* Service Image */}
      <img
        src={service?.image || '/placeholder.png'}
        className="w-full h-[420px] object-cover rounded-xl"
        alt={service?.name}
      />

      {/* Service Info and Booking */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-4xl font-bold">{service?.name || 'Service Name'}</h2>
          <p className="text-gray-500">{service?.serviceType || 'Service Type'}</p>
          <p className="text-gray-700 leading-relaxed">
            {service?.description || 'No description available.'}
          </p>
        </div>

        {/* Booking Card */}
        <div className="border-2 border-pink-600 rounded-xl p-5 shadow-md flex flex-col items-center gap-4">
          <p className="text-3xl font-bold text-pink-600">৳ {service?.price || 0}</p>
          <button
            onClick={() => {
              if (user) setOpen(true);
              else
                Swal.fire({
                  icon: 'warning',
                  title: 'Login Required',
                  text: 'Please login to book this service',
                  confirmButtonColor: '#d63384',
                });
            }}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-3">
            <h3 className="text-2xl font-semibold mb-2">Confirm Booking</h3>

            <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-2">
              <input
                readOnly
                {...register('userName')}
                defaultValue={user?.displayName || ''}
                className="w-full border-2 border-pink-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <input
                readOnly
                {...register('email')}
                defaultValue={user?.email || ''}
                className="w-full border-2 border-pink-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <input
                readOnly
                {...register('serviceName')}
                defaultValue={service?.name || ''}
                className="w-full border-2 border-pink-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              <input
                type="date"
                {...register('date', { required: 'Booking date is required' })}
                className="w-full border-2 border-pink-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

              <input
                type="text"
                {...register('location', { required: 'Location is required' })}
                placeholder="Event / Home Location"
                className="w-full border-2 border-pink-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

              <div className="flex gap-3 mt-3">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700 transition"
                >
                  Confirm
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    reset();
                  }}
                  className="flex-1 border-2 border-pink-600 py-2 rounded font-semibold text-pink-600 hover:bg-pink-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <h2 className="text-2xl font-bold text-gray-700">Reviews ({reviews.length})</h2>
      <div className="space-y-4">
        {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
        {reviews.map((r) => (
          <div
            key={r._id}
            className="flex items-start gap-3 p-3 border-2 rounded-lg border-pink-200"
          >
            <img
              src={user.photoURL || '/placeholder-user.png'}
              alt={r.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{r.userName}</h3>
                <div className="flex items-center">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                  {Array.from({ length: 5 - r.rating }).map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mt-1">{r.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* Review Form */}
        {user && (
          <form
            onSubmit={handleSubmit(onSubmitReview)}
            className="border-2 border-pink-300 p-4 rounded-lg space-y-3 focus-within:ring-2 focus-within:ring-pink-500"
          >
            <h3 className="font-semibold text-lg text-gray-700">Submit Your Review</h3>

            <label className="block text-sm font-medium text-gray-600">Rating</label>
            <select
              {...register('rating', { required: true })}
              className="w-full border-2 border-pink-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select rating</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? 's' : ''}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-600">Comment</label>
            <textarea
              {...register('comment', { required: true })}
              placeholder="Write your review..."
              className="w-full border-2 border-pink-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <button
              type="submit"
              className="bg-pink-600 text-white py-2 px-4 rounded font-semibold hover:bg-pink-700 transition"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
