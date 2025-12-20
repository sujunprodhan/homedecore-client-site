import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';

const DecoratorDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // logged-in decorator info
  const decoratorEmail = user?.email;

  const [projects, setProjects] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const today = new Date().toISOString().split('T')[0]; 

  // Fetch assigned projects
  useEffect(() => {
    if (!decoratorEmail) return;

    const fetchProjects = async () => {
      try {
        const res = await axiosSecure.get(`/decorator/projects?decoratorEmail=${decoratorEmail}`);
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, [decoratorEmail, axiosSecure]);

  // Fetch today's schedule
  useEffect(() => {
    if (!decoratorEmail) return;

    const fetchSchedule = async () => {
      try {
        const res = await axiosSecure.get(
          `/decorator/schedule?decoratorEmail=${decoratorEmail}&date=${today}`
        );
        setSchedule(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSchedule();
  }, [decoratorEmail, today, axiosSecure]);

  // Fetch earnings
  useEffect(() => {
    if (!decoratorEmail) return;

    const fetchEarnings = async () => {
      try {
        const res = await axiosSecure.get(`/decorator/earnings?decoratorEmail=${decoratorEmail}`);
        const total = res.data.reduce((sum, payment) => sum + (payment.price || 0), 0);
        setEarnings(total);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEarnings();
  }, [decoratorEmail, axiosSecure]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">Decorator Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Assigned Projects */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
          <div className="text-3xl mb-2">🗂</div>
          <h2 className="text-xl font-semibold text-gray-800">My Assigned Projects</h2>
          <p className="text-gray-500">{projects.length} projects</p>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
          <div className="text-3xl mb-2">📅</div>
          <h2 className="text-xl font-semibold text-gray-800">Today's Schedule</h2>
          <p className="text-gray-500">{schedule.length} events</p>
        </div>

        {/* Pending Updates */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
          <div className="text-3xl mb-2">✅</div>
          <h2 className="text-xl font-semibold text-gray-800">Pending Updates</h2>
          <p className="text-gray-500">
            {projects.filter((p) => p.status !== 'Completed').length} pending
          </p>
        </div>

        {/* Earnings Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
          <div className="text-3xl mb-2">💰</div>
          <h2 className="text-xl font-semibold text-gray-800">Earnings Summary</h2>
          <p className="text-gray-500">৳ {earnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">Assigned Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects assigned yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Project Name</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{p.serviceName}</td>
                  <td className="py-2 px-4">{p.userName || p.userEmail}</td>
                  <td className="py-2 px-4">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DecoratorDashboard;
