import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [payment, setPayment] = useState(null);
  const [message, setMessage] = useState('');
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!sessionId) return;

    const fetchPayment = async () => {
      try {
        const res = await axiosSecure.patch(`/payments-success?session_id=${sessionId}`);
        const data = res.data;

        if (data.payment && data.payment.paymentStatus === 'paid') {
          setPayment(data.payment);
          setMessage('Payment completed successfully!');
        } else if (data.message === 'Payment already processed') {
          setPayment(data.payment || null);
          setMessage('This payment has already been processed.');
        } else {
          setMessage(data.message || 'Payment failed.');
        }
      } catch (error) {
        console.error(error);
        setMessage('Failed to verify payment.');
      }
    };

    fetchPayment();
  }, [sessionId, axiosSecure]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8">
        {/* Status Header */}
        <div className="text-center mb-6">
          <h1 className={`text-4xl font-extrabold ${payment ? 'text-green-600' : 'text-red-500'}`}>
            {payment ? 'Payment Successful' : 'Payment Status'}
          </h1>
          {message && <p className="mt-2 text-lg font-medium text-gray-700">{message}</p>}
        </div>

        {/* Payment Details Table */}
        {payment && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Service</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Transaction ID</th>
                  <th className="px-6 py-3 text-left">Tracking ID</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50 hover:bg-gray-100 transition">
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4 font-semibold">{payment.serviceName}</td>
                  <td className="px-6 py-4">{formatCurrency(payment.price)}</td>
                  <td className="px-6 py-4 text-xs break-all">{payment.transactionId}</td>
                  <td className="px-6 py-4">{payment.trackingId || '-'}</td>
                  <td className="px-6 py-4">{formatDate(payment.paidAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
