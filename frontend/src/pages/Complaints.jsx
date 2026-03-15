import { useState } from "react";
import complaintsData from "../data/complaints";

function Complaints() {

const [complaints] = useState(complaintsData);
const [hostelFilter, setHostelFilter] = useState("All");
const [searchTerm, setSearchTerm] = useState("");

return (

<div className="p-6">

<h1 className="text-2xl font-bold mb-6">Complaints Management</h1>

<div className="flex gap-4 mb-4">

<input
type="text"
placeholder="Search student..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
className="border p-2 rounded"
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

<table className="w-full bg-white shadow rounded">

<thead className="bg-gray-200">

<tr>

<th className="p-3 text-left">Student</th>
<th className="p-3 text-left">Room</th>
<th className="p-3 text-left">Hostel</th>
<th className="p-3 text-left">Complaint</th>
<th className="p-3 text-left">Status</th>

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

</tr>

))}

</tbody>

</table>

</div>

);

}

export default Complaints;