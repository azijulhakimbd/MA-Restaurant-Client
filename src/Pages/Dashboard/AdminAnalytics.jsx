import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://restaurant-management-server-7rzjc6mvb.vercel.app/admin/analytics")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Analytics error:", err));
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Restaurant Analytics Dashboard
      </h1>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border rounded-xl p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Revenue</h2>
          <p className="text-2xl font-bold text-green-600">${data.totalRevenue}</p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Orders</h2>
          <p className="text-2xl font-bold text-blue-600">{data.totalOrders}</p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Customers</h2>
          <p className="text-2xl font-bold text-orange-600">{data.totalCustomers}</p>
        </div>
      </div>

      {/* --- Daily Sales Line Chart --- */}
      <div className="bg-white border rounded-xl p-6 shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">📈 Daily Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.dailySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalSales" stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* --- Top Selling Foods Bar Chart --- */}
      <div className="bg-white border rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">🍕 Top Selling Foods</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.topFoods}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalQuantity" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
