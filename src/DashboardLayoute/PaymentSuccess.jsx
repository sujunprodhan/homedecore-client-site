import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      {paymentInfo.success ? (
        <>
          <p>
            <strong>Transaction ID:</strong> {paymentInfo.transactionId}
          </p>
          <p>
            <strong>Tracking ID:</strong> {paymentInfo.trackingId}
          </p>
        </>
      ) : (
        <p>Payment failed or already processed.</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
