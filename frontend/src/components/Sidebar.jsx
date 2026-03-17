import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaUserGraduate, 
  FaBed, 
  FaMoneyBill, 
  FaExclamationCircle,
  FaSignOutAlt 
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white p-5 flex flex-col justify-between">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <h2 className="text-2xl font-bold mb-10">
          Hostel Admin
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col space-y-4">

          <NavLink to="/dashboard" className={navStyle}>
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink to="/students" className={navStyle}>
            <FaUserGraduate /> Students
          </NavLink>

          <NavLink to="/rooms" className={navStyle}>
            <FaBed /> Rooms
          </NavLink>

          <NavLink to="/fees" className={navStyle}>
            <FaMoneyBill /> Fees
          </NavLink>

          <NavLink to="/complaints" className={navStyle}>
            <FaExclamationCircle /> Complaints
          </NavLink>

        </nav>
      </div>

      {/* Bottom Section (Logout) */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 shadow-lg hover:shadow-blue-500/30 transition"
      >
        <FaSignOutAlt /> Logout
      </button>

    </div>
  );
}

const navStyle = ({ isActive }) =>
  `flex items-center gap-3 p-3 rounded-lg transition ${
    isActive 
      ? "bg-blue-600" 
      : "hover:bg-gray-700"
  }`;

export default Sidebar;