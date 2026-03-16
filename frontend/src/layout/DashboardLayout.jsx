import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 ml-64">
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>

    </div>
  );
}

export default DashboardLayout;