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
      window.location.href = res.data.url;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed. Try again.');
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading booking...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      <p>
        <strong>Service:</strong> {booking?.serviceName}
      </p>
      <p>
        <strong>Price:</strong> ৳{booking?.price}
      </p>

      <button onClick={handlePayment} className="btn btn-success w-full mt-4">
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
