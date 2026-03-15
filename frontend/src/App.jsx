import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Fees from "./pages/Fees";
import Complaints from "./pages/Complaints";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
  <DashboardLayout>
    <Dashboard />
  </DashboardLayout>
} />

        <Route path="/students" element={
          <DashboardLayout>
            <Students />
          </DashboardLayout>
        } />

        <Route path="/rooms" element={
          <DashboardLayout>
            <Rooms />
          </DashboardLayout>
        } />

        <Route path="/fees" element={
          <DashboardLayout>
            <Fees />
          </DashboardLayout>
        } />

        <Route path="/complaints" element={
          <DashboardLayout>
            <Complaints />
          </DashboardLayout>
        } />

        <Route path="/reports" element={
          <DashboardLayout>
            <Reports />
          </DashboardLayout>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;