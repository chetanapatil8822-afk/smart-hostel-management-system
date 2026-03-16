import { useState } from "react";
import roomsData from "../data/rooms";

function Rooms() {
  const [rooms, setRooms] = useState(roomsData);
  const [hostelFilter, setHostelFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [formData, setFormData] = useState({
    roomNo: "",
    hostel: "",
    capacity: "",
    occupied: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Edit room
  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      roomNo: room.roomNo,
      hostel: room.hostel,
      capacity: room.capacity,
      occupied: room.occupied
    });
    setShowModal(true);
  };

  // Save room (Add/Edit)
  const saveRoom = () => {
    if (editingRoom) {
      const updatedRooms = rooms.map((room) =>
        room.id === editingRoom.id
          ? { ...room, ...formData, capacity: Number(formData.capacity), occupied: Number(formData.occupied) }
          : room
      );
      setRooms(updatedRooms);
      setEditingRoom(null);
    } else {
      const newRoom = {
        id: rooms.length + 1,
        ...formData,
        capacity: Number(formData.capacity),
        occupied: Number(formData.occupied)
      };
      setRooms([...rooms, newRoom]);
    }

    setFormData({
      roomNo: "",
      hostel: "",
      capacity: "",
      occupied: ""
    });

    setShowModal(false);
  };

  // Delete room
  const deleteRoom = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
  };

  // Dashboard stats
  const totalRooms = rooms.length;
  const fullRooms = rooms.filter(r => r.occupied >= r.capacity).length;
  const availableRooms = rooms.filter(r => r.occupied < r.capacity).length;

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Rooms Management</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Total Rooms</h3>
          <p className="text-2xl font-bold">{totalRooms}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Full Rooms</h3>
          <p className="text-2xl font-bold">{fullRooms}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Available Rooms</h3>
          <p className="text-2xl font-bold">{availableRooms}</p>
        </div>
      </div>

      {/* Search + Filter + Add */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search room..."
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
            setEditingRoom(null);
            setFormData({
              roomNo: "",
              hostel: "",
              capacity: "",
              occupied: ""
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Room
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Room No</th>
              <th className="p-3 text-left">Hostel</th>
              <th className="p-3 text-left">Capacity</th>
              <th className="p-3 text-left">Occupied</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms
              .filter((room) =>
                (hostelFilter === "All" || room.hostel === hostelFilter) &&
                room.roomNo.toString().includes(searchTerm)
              )
              .map((room) => (
                <tr key={room.id} className="border-t">
                  <td className="p-3">{room.roomNo}</td>
                  <td className="p-3">{room.hostel}</td>
                  <td className="p-3">{room.capacity}</td>
                  <td className="p-3">{room.occupied}</td>
                  <td className="p-3">
                    {room.occupied >= room.capacity ? (
                      <span className="text-red-600 font-semibold">Full</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Available</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(room)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRoom(room.id)}
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
              {editingRoom ? "Edit Room" : "Add Room"}
            </h2>

            <input
              name="roomNo"
              placeholder="Room Number"
              value={formData.roomNo}
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
              name="capacity"
              type="number"
              placeholder="Capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              name="occupied"
              type="number"
              placeholder="Occupied"
              value={formData.occupied}
              onChange={handleChange}
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveRoom}
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

export default Rooms;