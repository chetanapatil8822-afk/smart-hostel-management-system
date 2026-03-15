const rooms = [];

/* Boys Hostel Rooms */

for (let i = 1; i <= 50; i++) {

rooms.push({
id: i,
roomNo: 100 + i,
hostel: "Boys",
capacity: 2,
occupied: Math.floor(Math.random() * 3),
});

}

/* Girls Hostel Rooms */

for (let i = 1; i <= 50; i++) {

rooms.push({
id: 50 + i,
roomNo: 200 + i,
hostel: "Girls",
capacity: 2,
occupied: Math.floor(Math.random() * 3),
});

}

export default rooms;