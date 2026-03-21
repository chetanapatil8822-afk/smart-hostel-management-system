import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Students() {

  const [showModal, setShowModal] = useState(false);
  const { students, setStudents } = useContext(AppContext); // ✅ CORRECT

  const updateStudent = (id, newData) => {
  const updated = students.map(s =>
    s.id === id ? { ...s, ...newData } : s
  );

  setStudents(updated);
};

  const [editingStudent, setEditingStudent] = useState(null);
  const [hostelFilter, setHostelFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    room: "",
    hostel: "",
    contact: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Edit Function
  const handleEdit = (student) => {

    setEditingStudent(student);

    setFormData({
      name: student.name,
      course: student.course,
      room: student.room,
      hostel: student.hostel,
      contact: student.contact
    });

    setShowModal(true);
  };

  // Save Student
  const saveStudent = () => {

    if (editingStudent) {

      const updatedStudents = students.map((student) =>
        student.id === editingStudent.id
          ? { ...student, ...formData }
          : student
      );

      setStudents(updatedStudents);
      setEditingStudent(null);

    } else {

      const newStudent = {
        id: students.length + 1,
        ...formData
      };

      setStudents([...students, newStudent]);
    }

    setFormData({
      name: "",
      course: "",
      room: "",
      hostel: "",
      contact: ""
    });

    setShowModal(false);
  };

  // Delete
  const deleteStudent = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );
    setStudents(updatedStudents);
  };

  // Stats
  const totalStudents = students.length;

  const boysStudents = students.filter(
    (student) => student.hostel === "Boys"
  ).length;

  const girlsStudents = students.filter(
    (student) => student.hostel === "Girls"
  ).length;

  return (
    <div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Students</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Total Students</h3>
          <p className="text-2xl font-bold">{totalStudents}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Boys Hostel</h3>
          <p className="text-2xl font-bold">{boysStudents}</p>
        </div>

        <div className="bg-pink-500 text-white p-4 rounded-xl shadow">
          <h3 className="text-lg">Girls Hostel</h3>
          <p className="text-2xl font-bold">{girlsStudents}</p>
        </div>

      </div>

      {/* Search + Filter + Add Button */}

      <div className="flex justify-between items-center mb-6">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-64"
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
            setEditingStudent(null);
            setFormData({
              name: "",
              course: "",
              room: "",
              hostel: "",
              contact: ""
            });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Student
        </button>

      </div>

      {/* Table */}

      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Course</th>
              <th className="text-left p-3">Room</th>
              <th className="text-left p-3">Hostel</th>
              <th className="text-left p-3">Contact</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>

{students
  .filter((student) =>
    (hostelFilter === "All" || student.hostel === hostelFilter) &&
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((student) => (

<tr key={student.id} className="border-t">

<td className="p-3">{student.id}</td>
<td className="p-3">{student.name}</td>
<td className="p-3">{student.course}</td>
<td className="p-3">{student.room}</td>
<td className="p-3">{student.hostel}</td>
<td className="p-3">{student.contact}</td>

<td className="p-3 flex gap-2">

<button
onClick={() => handleEdit(student)}
className="bg-yellow-500 text-white px-3 py-1 rounded"
>
Edit
</button>

<button
onClick={() => deleteStudent(student.id)}
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
{editingStudent ? "Edit Student" : "Add Student"}
</h2>

<input
name="name"
placeholder="Student Name"
value={formData.name}
onChange={handleChange}
className="w-full border p-2 mb-3 rounded"
/>

<input
name="course"
placeholder="Course"
value={formData.course}
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
name="contact"
placeholder="Contact"
value={formData.contact}
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
onClick={saveStudent}
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

export default Students;