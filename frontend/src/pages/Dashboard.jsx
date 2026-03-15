import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <DashboardCard
          title="Total Students"
          value="120"
        />

        <DashboardCard
          title="Available Rooms"
          value="45"
        />

        <DashboardCard
          title="Pending Fees"
          value="12"
        />

        <DashboardCard
          title="Complaints"
          value="5"
        />

      </div>

    </div>
  );
}

export default Dashboard;