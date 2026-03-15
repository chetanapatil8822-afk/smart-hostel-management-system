import students from "./students";

const complaintTexts = [
"Water leakage",
"WiFi not working",
"Electricity issue",
"Fan not working",
"Bathroom cleaning required",
"Broken window",
"AC not cooling",
"Light not working"
];

const complaints = students.map((student, index) => {

const complaint = complaintTexts[index % complaintTexts.length];

return {
id: student.id,
name: student.name,
room: student.room,
hostel: student.hostel,
complaint,
status: Math.random() > 0.5 ? "Resolved" : "Pending"
};

});

export default complaints;