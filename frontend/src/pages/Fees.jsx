import { useState } from "react";
import feesData from "../data/fees";

function Fees() {

  const [fees, setFees] = useState(feesData);
  const [hostelFilter, setHostelFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFee, setEditingFee] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    room: "",
    hostel: "",
    total: "",
    paid: "",
    due: "",
    status: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Edit fee record
  const handleEdit = (fee) => {
    setEditingFee(fee);
    setFormData({
      name: fee.name,
      room: fee.room,
      hostel: fee.hostel,
      total: fee.total,
      paid: fee.paid,
      due: fee.total - fee.paid,
      status: fee.status
    });
    setShowModal(true);
  };

  // Save fee (Add/Edit)
  const saveFee = () => {
    const updatedFee = {
      ...formData,
      total: Number(formData.total),
      paid: Number(formData.paid),
      due: Number(formData.total) - Number(formData.paid),
      status: Number(formData.paid) >= Number(formData.total) ? "Paid" : "Pending"
    };

    if (editingFee) {
      const updatedFees = fees.map((fee) =>
        fee.id === editingFee.id ? updatedFee : fee
      );
      setFees(updatedFees);
      setEditingFee(null);
    } else {
      const newFee = {
        id: fees.length + 1,
        ...updatedFee
      };
      setFees([...fees, newFee]);
    }

    setFormData({
      name: "",
      room: "",
      hostel: "",
      total: "",
      paid: "",
      due: "",
      status: ""
    });

    setShowModal(false);
  };

  // Delete fee
  const deleteFee = (id) => {
    const updatedFees = fees.filter((fee) => fee.id !== id);
    setFees(updatedFees);
  };

  // Dashboard stats
  const totalRecords = fees.length;
  const paidRecords = fees.filter(fee => fee.status === "Paid").length;
  const pendingRecords = fees.filter(fee => fee.status === "Pending").length;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Fees Management</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Total Records</h3>
          <p className="text-2xl font-bold">{totalRecords}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Paid</h3>
          <p className="text-2xl font-bold">{paidRecords}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Pending</h3>
          <p className="text-2xl font-bold">{pendingRecords}</p>
        </div>
      </div>

      {/* Search + Filter + Add */}
      <div className="flex justify-between items-center mb-4">

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-72"
          />

          <select
            onChange={(e) => setHostelFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All Hostels</option>
            <option value="Boys">Boys Hostel</option>
            <option value="Girls">Girls Hostel</option>
          </select>
        </div>

        <button
          onClick={() => {
            setEditingFee(null);
            setFormData({
              name: "",
              room: "",
              hostel: "",
              total: "",
              paid: "",
              due: "",
              status: ""
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Record
        </button>

      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Hostel</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Due</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees
              .filter((fee) =>
                (hostelFilter === "All" || fee.hostel === hostelFilter) &&
                fee.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((fee) => (
                <tr key={fee.id} className="border-t">
                  <td className="p-3">{fee.name}</td>
                  <td className="p-3">{fee.room}</td>
                  <td className="p-3">{fee.hostel}</td>
                  <td className="p-3">₹{fee.total}</td>
                  <td className="p-3">₹{fee.paid}</td>
                  <td className="p-3">₹{fee.due}</td>
                  <td className="p-3">
                    {fee.status === "Paid" ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(fee)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFee(fee.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-4">
              {editingFee ? "Edit Record" : "Add Record"}
            </h2>

            <input
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              name="room"
              placeholder="Room Number"
              value={formData.room}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            >
              <option value="">Select Hostel</option>
              <option value="Boys">Boys Hostel</option>
              <option value="Girls">Girls Hostel</option>
            </select>

            <input
              name="total"
              type="number"
              placeholder="Total Amount"
              value={formData.total}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="paid"
              type="number"
              placeholder="Paid Amount"
              value={formData.paid}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveFee}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Fees;