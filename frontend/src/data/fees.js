import students from "./students";

const fees = students.map((student) => {

const total = 5000;
const paid = Math.floor(Math.random() * 5000);
const due = total - paid;

return {
id: student.id,
name: student.name,
room: student.room,
hostel: student.hostel,
total,
paid,
due,
status: due === 0 ? "Paid" : "Pending"
};

});

export default fees;