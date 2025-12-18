const DecoratorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Decorator Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card shadow p-6">My Projects</div>
        <div className="card shadow p-6">Today's Schedule</div>
        <div className="card shadow p-6">Earnings</div>
      </div>
    </div>
  );
};

export default DecoratorDashboard;
