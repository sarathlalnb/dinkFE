import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(
        "http://localhost:5000/api/orders",
        config
      );
      setOrders(data);
    };
    fetchOrders();
  }, [user]);

  const updateStatus = async (id) => {
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    const { data } = await axios.put(
      `http://localhost:5000/api/orders/${id}/status`,
      {},
      config
    );
    setOrders((prev) => prev.map((order) => (order._id === id ? data : order)));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <p>
            <strong>ID:</strong> {order._id}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalPrice}
          </p>
          <button onClick={() => updateStatus(order._id)}>
            Advance Status
          </button>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
