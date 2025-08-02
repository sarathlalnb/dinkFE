import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrdersPage.css";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      console.log(data)
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders-container">
      <h2>
        <i className="fas fa-box-open"></i> All Orders
      </h2>
      {loading ? (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : (
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>
                  <i class="fas fa-address-card"></i> Address
                </th>
                <th>
                  <i className="fas fa-box-open"></i> Items
                </th>
                <th>
                  <i className="fas fa-money-bill-wave"></i> Total
                </th>
                <th>Status</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    ,{order.shippingAddress.postalCode}
                  </td>
                  <td>
                    {order.orderItems.map((item) => (
                      <div key={item._id}>
                        {item.name} x {item.qty}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <span className={`badge ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-dropdown"
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
