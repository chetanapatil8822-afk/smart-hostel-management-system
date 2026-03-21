import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Register() {
  const { users, setUsers } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {

    // 🔴 validation
    if (!name || !email || !password) {
      setError("⚠ All fields are required!");
      return;
    }

    // 🔴 check existing user
    const exists = users.find(u => u.email === email);
    if (exists) {
      setError("⚠ User already exists!");
      return;
    }

    // 🟢 new user object
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role
    };

    // 🟢 update context
    setUsers([...users, newUser]);

    // 🟢 redirect to login
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
      
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[30rem] transform hover:scale-105 transition">

        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Register
        </h1>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border mb-4 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border mb-4 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border mb-4 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <div className="flex justify-between mb-6">
          <label className={`px-4 py-2 rounded-lg cursor-pointer ${
            role === "Admin" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}>
            <input
              type="radio"
              value="Admin"
              className="hidden"
              checked={role === "Admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>

          <label className={`px-4 py-2 rounded-lg cursor-pointer ${
            role === "Student" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}>
            <input
              type="radio"
              value="Student"
              className="hidden"
              checked={role === "Student"}
              onChange={(e) => setRole(e.target.value)}
            />
            Student
          </label>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;