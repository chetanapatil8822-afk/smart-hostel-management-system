import students from "../data/students";
import rooms from "../data/rooms";
import fees from "../data/fees";
import complaints from "../data/complaints";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const { students } = useContext(AppContext);
  const { fees, rooms, complaints } = useContext(AppContext);
 
  const navigate = useNavigate();

  const [hostelFilter, setHostelFilter] = useState("All");

  const handleLogout = () => {
  localStorage.clear("user"); 
  navigate("/");
};

  const filteredStudents =
    hostelFilter === "All"
      ? students
      : students.filter((s) => s.hostel === hostelFilter);

  const filteredRooms =
    hostelFilter === "All"
      ? rooms
      : rooms.filter((r) => r.hostel === hostelFilter);

  const filteredFees =
    hostelFilter === "All"
      ? fees
      : fees.filter((f) => f.hostel === hostelFilter);

  const filteredComplaints =
    hostelFilter === "All"
      ? complaints
      : complaints.filter((c) => c.hostel === hostelFilter);

  const totalStudents = filteredStudents.length;

  const boysCount = students.filter((s) => s.hostel === "Boys").length;
  const girlsCount = students.filter((s) => s.hostel === "Girls").length;

  const totalRooms = filteredRooms.length;

  const availableRooms = filteredRooms.filter(
    (r) => r.occupied < r.capacity
  ).length;

  const fullRooms = filteredRooms.filter(
    (r) => r.occupied >= r.capacity
  ).length;

  const pendingFees = filteredFees.filter(
    (f) => f.status === "Pending"
  ).length;

  const paidFees = filteredFees.filter(
    (f) => f.status === "Paid"
  ).length;

  const pendingComplaints = filteredComplaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolvedComplaints = filteredComplaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  // Pie Chart Data (Fees)
const feesData = [
  { name: "Paid", value: paidFees },
  { name: "Pending", value: pendingFees },
];

// Pie Chart Data (Complaints)
const complaintData = [
  { name: "Resolved", value: resolvedComplaints },
  { name: "Pending", value: pendingComplaints },
];

// Bar Chart Data (Rooms)
const roomsData = [
  { name: "Available", value: availableRooms },
  { name: "Full", value: fullRooms },
];

  return (
    <div className="p-6">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        Analytics Overview
      </h1>

      {/* Filter */}

      <select
        onChange={(e) => setHostelFilter(e.target.value)}
        className="border p-2 rounded mb-6"
      >
        <option value="All">All Hostels</option>
        <option value="Boys">Boys Hostel</option>
        <option value="Girls">Girls Hostel</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

  {/* Fees Pie Chart */}
  <div className="bg-white p-4 rounded-xl shadow-md">
    <h2 className="text-md font-semibold mb-2">Fees Overview</h2>

    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={feesData}
          dataKey="value"
          outerRadius={60}   // 👈 smaller
          label={false}      // 👈 remove labels (clean look)
        >
          <Cell fill="#3b82f6" />
          <Cell fill="#8b5cf6" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Complaints Pie Chart */}
  <div className="bg-white p-4 rounded-xl shadow-md">
    <h2 className="text-md font-semibold mb-2">Issue Tracking</h2>

    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={complaintData}
          dataKey="value"
          outerRadius={60}
          label={false}
        >
          <Cell fill="#3b82f6" />
          <Cell fill="#8b5cf6" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

</div>


{/* Rooms Bar Chart */}
<div className="bg-white p-4 rounded-xl shadow-md mt-4 mb-12">

  <h2 className="text-md font-semibold mb-2">Occupancy Analytics</h2>

  <ResponsiveContainer width="100%" height={220}>
    <BarChart data={roomsData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#3b82f6" />
    </BarChart>
  </ResponsiveContainer>

</div>


      {/* Rooms & Students */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 shadow-lg rounded-xl">
          <h2 className="text-gray-500">Total Students</h2>
          <p className="text-2xl font-bold">{totalStudents}</p>
        </div>

        <div className="bg-white p-5 shadow-lg rounded-xl">
          <h2 className="text-gray-500">Total Rooms</h2>
          <p className="text-2xl font-bold">{totalRooms}</p>
        </div>

        <div className="bg-white p-5 shadow-lg rounded-xl">
          <h2 className="text-gray-500">Available Rooms</h2>
          <p className="text-2xl font-bold">{availableRooms}</p>
        </div>

        <div className="bg-white p-5 shadow-lg rounded-xl">
          <h2 className="text-gray-500">Full Rooms</h2>
          <p className="text-2xl font-bold">{fullRooms}</p>
        </div>

      </div>

      {/* Fees & Complaints */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 shadow-lg rounded-xl">
          <h2 className="text-gray-500">Paid Fees</h2>
          <p className="text-2xl font-bold text-green-600">{paidFees}</p>
        </div>

        <div className="bg-white p-5 shadow-lg rounded-xl">
          <h2 className="text-gray-500">Pending Fees</h2>
          <p className="text-2xl font-bold text-red-600">{pendingFees}</p>
        </div>

        <div className="bg-white p-5 shadow-lg rounded-xl">
          <h2 className="text-gray-500">Resolved Complaints</h2>
          <p className="text-2xl font-bold text-green-600">{resolvedComplaints}</p>
        </div>

        <div className="bg-white p-5 shadow-lg rounded-xl">
          <h2 className="text-gray-500">Pending Complaints</h2>
          <p className="text-2xl font-bold text-red-600">{pendingComplaints}</p>
        </div>

      </div>

      {/* Students Distribution */}
      <div className="bg-white p-6 shadow-lg rounded-xl">
        <h2 className="text-lg font-semibold mb-3">
          Students Distribution
        </h2>

        <p>Boys Hostel: {boysCount}</p>
        <p>Girls Hostel: {girlsCount}</p>
      </div>
      

    </div>
  );
}

export default Dashboard;