const boyNames = [
"Rahul Sharma","Amit Verma","Rohan Gupta","Arjun Nair","Karan Mehta",
"Vikas Yadav","Aditya Deshmukh","Sanjay Kumar","Deepak Mishra","Varun Malhotra",
"Nikhil Jain","Harsh Patel","Mohit Bansal","Akash Singh","Siddharth Tiwari",
"Pankaj Dubey","Manish Thakur","Ankit Saxena","Pratik Shah","Rahul Chavan",
"Kunal Kapoor","Rakesh Verma","Rohit Pawar","Aman Gupta","Suraj Patil",
"Vivek Sharma","Saurabh Singh","Yash Kulkarni","Ritesh Gupta","Tarun Kumar",
"Anshul Mehta","Raj Malhotra","Gaurav Joshi","Nitin Patil","Ajay Yadav",
"Sameer Khan","Vishal Gupta","Lokesh Sharma","Devendra Singh","Ravi Kumar",
"Arvind Mishra","Kapil Sharma","Kishore Nair","Tejas Desai","Naveen Kumar",
"Rajat Verma","Dhruv Shah","Anand Kulkarni","Ramesh Patil","Arjun Singh"
];

const girlNames = [
"Priya Patel","Sneha Joshi","Anjali Patil","Pooja Singh","Neha Kulkarni",
"Meera Iyer","Kavya Reddy","Ayesha Khan","Ritu Agarwal","Simran Kaur",
"Tanvi Choudhary","Riya Sharma","Divya Bhatt","Riya Mehta","Swati Kulkarni",
"Neha Patil","Aditi Sharma","Pallavi Gupta","Nisha Verma","Kiran Yadav",
"Payal Singh","Anita Sharma","Shreya Kulkarni","Komal Patil","Shruti Mehta",
"Garima Jain","Sonal Gupta","Nidhi Sharma","Rashmi Singh","Sakshi Patel",
"Ananya Reddy","Pooja Deshmukh","Mitali Shah","Juhi Verma","Preeti Sharma",
"Monika Yadav","Khushi Jain","Sangeeta Patil","Lata Sharma","Bhavna Singh",
"Rachna Verma","Suman Gupta","Kirti Shah","Shalini Patil","Isha Sharma",
"Roshni Singh","Tanisha Jain","Vaishali Gupta","Puja Verma","Aarti Patel"
];

const courses = ["B.Tech","MBA","BCA","MCA"];

const students = [];

/* Boys Students */
for (let i = 0; i < 50; i++) {

students.push({
id: i + 1,
name: boyNames[i],
course: courses[i % 4],
room: 100 + i,
hostel: "Boys",
contact: "98" + Math.floor(10000000 + Math.random() * 89999999)
});

}

/* Girls Students */
for (let i = 0; i < 50; i++) {

students.push({
id: i + 51,
name: girlNames[i],
course: courses[i % 4],
room: 200 + i,
hostel: "Girls",
contact: "98" + Math.floor(10000000 + Math.random() * 89999999)
});

}

export default students;