import { useState } from "react";
import feesData from "../data/fees";

function Fees() {

const [fees] = useState(feesData);
const [hostelFilter, setHostelFilter] = useState("All");
const [searchTerm, setSearchTerm] = useState("");

return (

<div className="p-6">

<h1 className="text-2xl font-bold mb-6">Fees Management</h1>

{/* Search + Filter */}

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

</div>

<table className="w-full bg-white shadow rounded">

<thead className="bg-gray-200">

<tr>

<th className="p-3 text-left">Student</th>
<th className="p-3 text-left">Room</th>
<th className="p-3 text-left">Hostel</th>
<th className="p-3 text-left">Total</th>
<th className="p-3 text-left">Paid</th>
<th className="p-3 text-left">Due</th>
<th className="p-3 text-left">Status</th>

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

</tr>

))}

</tbody>

</table>

</div>

);

}

export default Fees;