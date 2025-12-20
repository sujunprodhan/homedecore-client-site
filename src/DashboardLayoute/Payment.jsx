import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const Payment = () => {
  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/${bookingId}`);
      return res.data;
    },
    enabled: !!bookingId,
  });

  const handlePayment = async () => {
    if (!booking) return;

    const paymentInfo = {
      bookingId: booking._id,
      bookingEmail: booking.email,
      bookingName: booking.serviceName,
      cost: booking.price,
    };

    try {
      const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

      if (res.data.url) {
        window.location.href = res.data.url; // Redirect to Stripe checkout
      } else {
     ('Failed to create checkout session. Try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      ('Payment initiation failed. Try again.');
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading booking...</p>;

  if (!booking) return <p className="text-center mt-10 text-red-500">Booking not found.</p>;

  return (
    <>
      <div className="max-w-md mx-auto mt-10 border-pink-600 border p-6 rounded-xl shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Payment Details</h2>
        <p>
          <strong className="text-pink-600 text-xl">Service:</strong> <span className='text-xl'>{booking.serviceName}</span>
        </p>
        <p>
          <strong className="text-pink-700 text-xl font-semibold">Price:</strong> ৳{booking.price}
        </p>

        <button
          onClick={handlePayment}
          className="mt-6 w-full px-4 py-2 rounded-lg text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-md transition"
        >
          Pay Now
        </button>
      </div>
    </>
  );
};

export default Payment;
