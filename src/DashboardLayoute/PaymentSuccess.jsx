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
          console.log(res.data);
          setPaymentInfo(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [sessionId, axiosSecure]);

  const isSuccess = paymentInfo.success;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#E92C8F]">
          Payment {isSuccess ? 'Successful' : 'Failed'}
        </h1>

        {isSuccess ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-left">
              <thead>
                <tr className="bg-[#E92C8F] text-white">
                  <th className="px-4 py-2">No.</th>
                  <th className="px-4 py-2">Service</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Transaction ID</th>
                  <th className="px-4 py-2">Tracking ID</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{1}</td>
                  <td className="px-4 py-3">{paymentInfo.payment?.service || 'N/A'}</td>
                  <td className="px-4 py-3">BDT {paymentInfo.payment?.amount || '0.00'}</td>
                  <td className="px-4 py-3">{paymentInfo.payment?.transactionId || 'N/A'}</td>
                  <td className="px-4 py-3">{paymentInfo.payment?.trackingId || 'N/A'}</td>
                  <td className="px-4 py-3">{paymentInfo.payment?.date || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-red-500 font-semibold mt-4">
            Payment failed or already processed.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
