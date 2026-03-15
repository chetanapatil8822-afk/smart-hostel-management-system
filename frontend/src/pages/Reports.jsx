import students from "../data/students";
import rooms from "../data/rooms";
import fees from "../data/fees";
import complaints from "../data/complaints";
import { useState } from "react";

function Reports() {

const [hostelFilter, setHostelFilter] = useState("All");

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

return (

<div className="p-6">

<h1 className="text-2xl font-bold mb-6">System Reports</h1>

<select
onChange={(e) => setHostelFilter(e.target.value)}
className="border p-2 rounded mb-6"
>

<option value="All">All Hostels</option>
<option value="Boys">Boys Hostel</option>
<option value="Girls">Girls Hostel</option>

</select>

<div className="grid grid-cols-4 gap-4 mb-6">

<div className="bg-white p-4 shadow rounded">
<h2 className="text-gray-500">Total Students</h2>
<p className="text-2xl font-bold">{totalStudents}</p>
</div>

<div className="bg-white p-4 shadow rounded">
<h2 className="text-gray-500">Total Rooms</h2>
<p className="text-2xl font-bold">{totalRooms}</p>
</div>

<div className="bg-white p-4 shadow rounded">
<h2 className="text-gray-500">Available Rooms</h2>
<p className="text-2xl font-bold">{availableRooms}</p>
</div>

<div className="bg-white p-4 shadow rounded">
<h2 className="text-gray-500">Full Rooms</h2>
<p className="text-2xl font-bold">{fullRooms}</p>
</div>

</div>

<div className="grid grid-cols-4 gap-4 mb-6">

<div className="bg-white p-4 shadow rounded">
<h2 className="text-gray-500">Paid Fees</h2>
<p className="text-2xl font-bold text-green-600">{paidFees}</p>
</div>

<div className="bg-white p-4 shadow rounded">
<h2 className="text-gray-500">Pending Fees</h2>
<p className="text-2xl font-bold text-red-600">{pendingFees}</p>
</div>

<div className="bg-white p-4 shadow rounded">
<h2 className="text-gray-500">Resolved Complaints</h2>
<p className="text-2xl font-bold text-green-600">{resolvedComplaints}</p>
</div>

<div className="bg-white p-4 shadow rounded">
<h2 className="text-gray-500">Pending Complaints</h2>
<p className="text-2xl font-bold text-red-600">{pendingComplaints}</p>
</div>

</div>

<div className="bg-white p-4 shadow rounded">

<h2 className="text-lg font-semibold mb-2">Students Distribution</h2>

<p>Boys Hostel: {boysCount}</p>
<p>Girls Hostel: {girlsCount}</p>

</div>

</div>

);

}

export default Reports;