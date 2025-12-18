const MyProjects = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">My Assigned Projects</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr className="text-pink-600">
            <th>Service</th>
            <th>Client</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Wedding Decor</td>
            <td>client@email.com</td>
            <td>Assigned</td>
            <td>
              <button className="btn btn-sm btn-success">Mark Completed</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyProjects;
