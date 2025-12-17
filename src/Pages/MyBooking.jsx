import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';

const MyBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/bookings?email=${user?.email}`).then((res) => setBookings(res.data));
  }, [axiosSecure, user]);

  const cancelBooking = async (id) => {
    await axiosSecure.patch(`/bookings/cancel/${id}`);
    setBookings(bookings.map((b) => (b._id === id ? { ...b, status: 'cancelled' } : b)));
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div key={b._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{b.serviceName}</h3>
            <p>📅 {b.bookingDate}</p>
            <p>📍 {b.location}</p>
            <p className="font-bold">৳ {b.price}</p>
            <p>
              Status: <b>{b.status}</b>
            </p>

            {b.status === 'pending' && (
              <button
                onClick={() => cancelBooking(b._id)}
                className="mt-3 w-full bg-red-500 text-white py-2 rounded"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
