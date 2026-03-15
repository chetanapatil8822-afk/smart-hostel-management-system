import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Navbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;