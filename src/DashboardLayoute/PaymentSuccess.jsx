import { useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useSearchParams } from 'react-router';


const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  const sessionId = params.get('session_id');

  useEffect(() => {

    console.log('Stripe session:', sessionId);
  }, [sessionId]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-4">Thank you for your payment.</p>
    </div>
  );
};

export default PaymentSuccess;
