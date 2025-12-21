import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaShoppingCart, FaStar, FaMoneyBillWave } from 'react-icons/fa';

const UserProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const bookingsRes = await axiosSecure.get(`/bookings?email=${user.email}`);
        const bookingData = bookingsRes.data || [];
        setBookings(bookingData);
        const sum = bookingData.reduce((acc, b) => acc + Number(b.price || 0), 0);
        setTotalSpent(sum);

        const reviewsRes = await axiosSecure.get(`/reviews?userEmail=${user.email}`);
        setReviews(reviewsRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email, axiosSecure]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return isNaN(d) ? '-' : d.toLocaleDateString();
  };

  // 🔹 Loading Spinner
  if (authLoading || loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader border-t-4 border-pink-600 w-12 h-12 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-600 font-semibold">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">My Profile</h1>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-6 mb-12">
        <img
          src={user.photoURL || '/placeholder-user.png'}
          className="w-32 h-32 rounded-full object-cover border-4 border-pink-300"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{user.displayName || 'User'}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-gray-500">
            Member since: {formatDate(user.metadata?.creationTime)}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <FaShoppingCart className="text-4xl text-pink-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
          <p className="text-2xl font-bold text-pink-600">{bookings.length}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <FaMoneyBillWave className="text-4xl text-green-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-700">Total Spent</h3>
          <p className="text-2xl font-bold text-green-600">৳ {totalSpent}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition">
          <FaStar className="text-4xl text-yellow-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-700">Your Reviews</h3>
          <p className="text-2xl font-bold text-yellow-500">{reviews.length}</p>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
              >
                <h3 className="font-semibold text-gray-800">{b.serviceName}</h3>
                <p className="text-pink-600 mt-1">Price: ৳ {b.price || 0}</p>
                <p className="text-gray-500 mt-1">Date: {formatDate(b.bookingDate)}</p>
                <p
                  className={`mt-2 font-semibold ${
                    b.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}
                >
                  Status: {b.status || '-'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
