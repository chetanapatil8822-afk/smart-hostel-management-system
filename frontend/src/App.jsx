import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Fees from "./pages/Fees";
import Complaints from "./pages/Complaints";
import StudentDashboard from "./pages/StudentDashboard";

// Layout
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Login Route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard + Sections */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/students"
          element={
            <DashboardLayout>
              <Students />
            </DashboardLayout>
          }
        />

        <Route
          path="/rooms"
          element={
            <DashboardLayout>
              <Rooms />
            </DashboardLayout>
          }
        />

        <Route
          path="/fees"
          element={
            <DashboardLayout>
              <Fees />
            </DashboardLayout>
          }
        />

        <Route
          path="/complaints"
          element={
            <DashboardLayout>
              <Complaints />
            </DashboardLayout>
          }
        />

  

        {/* New Feature: Student Dashboard */}
        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;