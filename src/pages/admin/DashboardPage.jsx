import { useEffect, useState } from "react";
import "./DashboardPage.css";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "../../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [summary, setSummary] = useState({});
  const [chartData, setChartData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/summary",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSummary(data);
      setChartData(data.monthlySales);
    };
    fetchData();
  }, []);

  const earningsChartData = {
    labels: chartData.map((d) => d.month),
    datasets: [
      {
        label: "Earnings ($)",
        data: chartData.map((d) => d.total),
        backgroundColor: "rgba(0,255,255,0.5)",
        borderColor: "#00ffff",
        borderWidth: 2,
      },
    ],
  };

  const ordersChartData = {
    labels: chartData.map((d) => d.month),
    datasets: [
      {
        label: "Orders",
        data: chartData.map((d) => d.orders),
        backgroundColor: "rgba(255,99,132,0.5)",
        borderColor: "#ff6384",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card stat-card">
          <i className="fas fa-rupee-sign fa-2x icon-primary" />
          <div>
            <p>Total Earnings</p>
            <h3>${summary.totalEarnings || 0}</h3>
          </div>
        </div>

        <div className="card stat-card">
          <i className="fas fa-box fa-2x icon-primary" />
          <div>
            <p>Total Products</p>
            <h3>{summary.totalProducts || 0}</h3>
          </div>
        </div>

        <div className="card stat-card">
          <i className="fas fa-shopping-cart fa-2x icon-primary" />
          <div>
            <p>Total Orders</p>
            <h3>{summary.totalOrders || 0}</h3>
          </div>
        </div>

        <div className="card stat-card">
          <i className="fas fa-users fa-2x icon-primary" />
          <div>
            <p>Total Users</p>
            <h3>{summary.totalUsers || 0}</h3>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="card chart-card">
          <h4>Orders Overview</h4>
          <Bar data={ordersChartData} />
        </div>
        <div className="card chart-card">
          <h4>Earnings Overview</h4>
          <Line data={earningsChartData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
