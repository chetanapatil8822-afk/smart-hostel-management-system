import { useState } from "react";
import roomsData from "../data/rooms";

function Rooms() {

const [rooms] = useState(roomsData);
const [hostelFilter, setHostelFilter] = useState("All");
const [searchTerm, setSearchTerm] = useState("");

return (

<div className="p-6">

<h1 className="text-2xl font-bold mb-6">Rooms Management</h1>

{/* Search + Filter */}

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

</div>

<table className="w-full bg-white shadow rounded">

<thead className="bg-gray-200">

<tr>

<th className="p-3 text-left">Room No</th>
<th className="p-3 text-left">Hostel</th>
<th className="p-3 text-left">Capacity</th>
<th className="p-3 text-left">Occupied</th>
<th className="p-3 text-left">Status</th>

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

</tr>

))}

</tbody>

</table>

</div>

);

}

export default Rooms;