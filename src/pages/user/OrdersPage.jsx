import { useEffect, useState } from "react";
import axios from "axios";
import "./OrdersPage.css";
import { useAuth } from "../../context/AuthContext";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("http://localhost:5000/api/orders/myorders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span>
                  <strong>Order ID:</strong> {order._id}
                </span>
                <span>
                  <strong>Status:</strong> {order.status}
                </span>
              </div>
              <div className="order-body">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>
                        <strong>{item.name}</strong>
                      </p>
                      <p>Qty: {item.qty}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <p>
                  <strong>Total:</strong> ₹{order.totalPrice}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
