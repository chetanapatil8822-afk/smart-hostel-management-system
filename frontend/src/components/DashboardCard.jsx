function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

      <h4 className="text-gray-500 text-sm">
        {title}
      </h4>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}

export default DashboardCard;