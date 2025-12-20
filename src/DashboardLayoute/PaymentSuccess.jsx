import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import jsPDF from 'jspdf';
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

        if (res.status === 200) {
          setPayment(data.payment);
          setMessage('Payment completed successfully!');
        } else if (data.message === 'Payment already processed') {
          setPayment(data.payment || null);
          setMessage('This payment has already been processed.');
        } else {
          setMessage(data.message || 'Payment failed.');
        }
      } catch (error) {
        setMessage('Failed to verify payment.');
      }
    };

    fetchPayment();
  }, [sessionId, axiosSecure]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
    }).format(amount);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  /* ================= PDF RECEIPT ================= */
  const handleDownloadReceipt = () => {
    if (!payment) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Payment Receipt', 105, 20, { align: 'center' });

    doc.setFontSize(11);
    doc.text('Thank you for your payment.', 105, 30, { align: 'center' });

    doc.line(20, 35, 190, 35);

    doc.setFontSize(12);
    doc.text(`Service Name: ${payment.serviceName}`, 20, 50);
    doc.text(`Amount Paid: ${formatCurrency(payment.price)}`, 20, 60);
    doc.text(`Transaction ID:`, 20, 70);
    doc.setFontSize(10);
    doc.text(payment.transactionId, 20, 78);

    doc.setFontSize(12);
    doc.text(`Tracking ID: ${payment.trackingId || 'N/A'}`, 20, 90);
    doc.text(`Payment Date: ${formatDate(payment.paidAt)}`, 20, 100);
    doc.text(`Status: Completed`, 20, 110);

    doc.line(20, 120, 190, 120);

    doc.setFontSize(10);
    doc.text('This is a system generated receipt. No signature required.', 105, 135, {
      align: 'center',
    });

    doc.save(`receipt-${payment.transactionId}.pdf`);
  };
  /* ================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Status Header */}
        <div className="text-center mb-10">
          {payment ? (
            <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 text-4xl">
              ✓
            </div>
          ) : (
            <div className="mx-auto mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 text-4xl">
              ✕
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            {payment ? 'Payment Successful' : 'Payment Status'}
          </h1>

          {message && <p className="mt-3 text-gray-600 text-lg">{message}</p>}
        </div>

        {/* Payment Summary */}
        {payment && (
          <div className="border rounded-2xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 font-semibold text-gray-700">Payment Summary</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-sm">
              <div>
                <p className="text-gray-500">Service</p>
                <p className="font-semibold">{payment.serviceName}</p>
              </div>

              <div>
                <p className="text-gray-500">Amount Paid</p>
                <p className="font-semibold text-green-600">{formatCurrency(payment.price)}</p>
              </div>

              <div>
                <p className="text-gray-500">Transaction ID</p>
                <p className="font-mono text-xs break-all">{payment.transactionId}</p>
              </div>

              <div>
                <p className="text-gray-500">Tracking ID</p>
                <p className="font-semibold">{payment.trackingId || 'N/A'}</p>
              </div>

              <div>
                <p className="text-gray-500">Payment Date</p>
                <p className="font-semibold">{formatDate(payment.paidAt)}</p>
              </div>

              <div>
                <p className="text-gray-500">Status</p>
                <span className="inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  Completed
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
            Go to Dashboard
          </button>

          <button
            onClick={handleDownloadReceipt}
            className="px-6 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 transition"
          >
            Download Receipt (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
