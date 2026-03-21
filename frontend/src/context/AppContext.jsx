import { createContext, useState } from "react";

// Import ALL data
import studentsData from "../data/students";
import complaintsData from "../data/complaints";
import roomsData from "../data/rooms";
import feesData from "../data/fees";
import usersData from "../data/users";

// Create Context
export const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {

  const [students, setStudents] = useState(studentsData);
  const [complaints, setComplaints] = useState(complaintsData);
  const [rooms, setRooms] = useState(roomsData);
  const [fees, setFees] = useState(feesData);
  const [users, setUsers] = useState(usersData);

  return (
    <AppContext.Provider value={{
      students, setStudents,
      complaints, setComplaints,
      rooms, setRooms,
      fees, setFees,
      users, setUsers
    }}>
      {children}
    </AppContext.Provider>
  );
};