import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const AdminDashboard = () => {
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 25000 },
    { month: 'Apr', revenue: 30000 },
  ];
  const serviceDemandData = [
    { service: 'Wedding Decor', bookings: 40 },
    { service: 'Birthday Decor', bookings: 25 },
    { service: 'Corporate Event', bookings: 15 },
  ];

  return (
    <div className="p-6 space-y-10">
      {/* ===== Revenue Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold text-pink-600">৳85,000</p>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold">This Month</h3>
          <p className="text-2xl font-bold text-pink-600">৳30,000</p>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold">Today</h3>
          <p className="text-2xl font-bold text-pink-600">৳2,500</p>
        </div>
      </div>

      {/* ===== Revenue Analytics Line Chart ===== */}
      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-xl font-bold mb-4">Revenue Analytics</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ===== Service Demand Histogram ===== */}
      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-xl font-bold mb-4">Service Demand (Histogram)</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={serviceDemandData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="service" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
