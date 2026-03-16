// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password && u.role === role);

    if (user) {
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userId", user.id);

      if (user.role === "Admin") navigate("/dashboard");
      else navigate("/student-dashboard");
    } else {
      setError("⚠ Invalid credentials or role!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
      <div className="bg-white p-10 shadow-2xl rounded-3xl w-[30rem] sm:w-[35rem] md:w-[39rem] transform transition duration-500 hover:scale-110 hover:shadow-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 whitespace-nowrap">
  Smart Hostel Management System
</h1>

        {error && (
          <p className="text-red-600 font-medium mb-4 animate-bounce">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border mb-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border mb-4 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
        />

        <div className="flex justify-between mb-6">
          <label className={`px-4 py-2 rounded-lg cursor-pointer transition ${
            role === "Admin" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`} >
            <input
              type="radio"
              name="role"
              value="Admin"
              className="hidden"
              checked={role === "Admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
          <label className={`px-4 py-2 rounded-lg cursor-pointer transition ${
            role === "Student" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}>
            <input
              type="radio"
              name="role"
              value="Student"
              className="hidden"
              checked={role === "Student"}
              onChange={(e) => setRole(e.target.value)}
            />
            Student
          </label>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-300"
        >
          Login
        </button>

      
      </div>
    </div>
  );
}

export default Login;