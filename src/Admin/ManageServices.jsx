import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newService, setNewService] = useState({
    service_name: '',
    cost: '',
    unit: '',
    service_category: '',
    description: '',
  });

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:3000/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = async () => {
    try {
      await axios.post('http://localhost:3000/services', newService);
      fetchServices();
      setNewService({
        service_name: '',
        cost: '',
        unit: '',
        service_category: '',
        description: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading services...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Manage Services</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        <input
          placeholder="Service Name"
          value={newService.service_name}
          onChange={(e) => setNewService({ ...newService, service_name: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Cost"
          type="number"
          value={newService.cost}
          onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Unit"
          value={newService.unit}
          onChange={(e) => setNewService({ ...newService, unit: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Category"
          value={newService.service_category}
          onChange={(e) => setNewService({ ...newService, service_category: e.target.value })}
          className="border p-2"
        />
        <input
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          className="border p-2"
        />
        <button onClick={handleAddService} className="bg-pink-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-pink-600 text-white">
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">Service Name</th>
            <th className="border px-4 py-2">Cost</th>
            <th className="border px-4 py-2">Unit</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, i) => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{s.service_name}</td>
              <td className="border px-4 py-2">{s.cost}</td>
              <td className="border px-4 py-2">{s.unit}</td>
              <td className="border px-4 py-2">{s.service_category}</td>
              <td className="border px-4 py-2">{s.description}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageServices;
