import { useState } from "react";
import complaintsData from "../data/complaints";

function Complaints() {

  const [complaints, setComplaints] = useState(complaintsData);
  const [hostelFilter, setHostelFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    room: "",
    hostel: "",
    complaint: "",
    status: "Pending"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Edit complaint
  const handleEdit = (c) => {
    setEditingComplaint(c);
    setFormData({
      name: c.name,
      room: c.room,
      hostel: c.hostel,
      complaint: c.complaint,
      status: c.status
    });
    setShowModal(true);
  };

  // Save complaint (Add/Edit)
  const saveComplaint = () => {
    if (editingComplaint) {
      const updatedComplaints = complaints.map((c) =>
        c.id === editingComplaint.id ? formData : c
      );
      setComplaints(updatedComplaints);
      setEditingComplaint(null);
    } else {
      const newComplaint = {
        id: complaints.length + 1,
        ...formData
      };
      setComplaints([...complaints, newComplaint]);
    }

    setFormData({
      name: "",
      room: "",
      hostel: "",
      complaint: "",
      status: "Pending"
    });

    setShowModal(false);
  };

  // Delete complaint
  const deleteComplaint = (id) => {
    const updatedComplaints = complaints.filter((c) => c.id !== id);
    setComplaints(updatedComplaints);
  };

  // Dashboard stats
  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter(c => c.status === "Resolved").length;
  const pendingCount = complaints.filter(c => c.status === "Pending").length;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Complaints Management</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Total Complaints</h3>
          <p className="text-2xl font-bold">{totalComplaints}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Resolved</h3>
          <p className="text-2xl font-bold">{resolvedCount}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Pending</h3>
          <p className="text-2xl font-bold">{pendingCount}</p>
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
            setEditingComplaint(null);
            setFormData({
              name: "",
              room: "",
              hostel: "",
              complaint: "",
              status: "Pending"
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Complaint
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
              <th className="p-3 text-left">Complaint</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints
              .filter((c) =>
                (hostelFilter === "All" || c.hostel === hostelFilter) &&
                c.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.room}</td>
                  <td className="p-3">{c.hostel}</td>
                  <td className="p-3">{c.complaint}</td>
                  <td className="p-3">
                    {c.status === "Resolved" ? (
                      <span className="text-green-600 font-semibold">Resolved</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteComplaint(c.id)}
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
              {editingComplaint ? "Edit Complaint" : "Add Complaint"}
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

            <textarea
              name="complaint"
              placeholder="Complaint Details"
              value={formData.complaint}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveComplaint}
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

export default Complaints;