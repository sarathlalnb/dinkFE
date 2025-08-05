import { useEffect, useState } from "react";
import axios from "axios";
import "./OrdersPage.css";
import { useAuth } from "../../context/AuthContext";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [reviewData, setReviewData] = useState({});
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

  const statusSteps = ["pending", "processing", "shipped", "completed"];

  const handleReviewChange = (orderId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  const submitReview = async (productId, orderId) => {
    const review = reviewData[orderId];
    if (!review || !review.rating || !review.comment) return;

    await axios.post(
      `http://localhost:5000/api/products/${productId}/reviews`,
      {
        rating: review.rating,
        comment: review.comment,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    alert("Review submitted!");
    setReviewData((prev) => {
      const updated = { ...prev };
      delete updated[orderId];
      return updated;
    });
  };

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

              <div className="status-tracker">
                <div
                  className={`status-line ${
                    order.status === "completed" ? "completed" : ""
                  }`}
                ></div>
                {statusSteps.map((step, index) => (
                  <div
                    key={step}
                    className={`status-step ${
                      statusSteps.indexOf(order.status) >= index
                        ? "completed"
                        : ""
                    }`}
                  >
                    <span></span>
                    <p>{step.charAt(0).toUpperCase() + step.slice(1)}</p>
                  </div>
                ))}
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
                      <p>${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <p>
                  <strong>Total:</strong> ${order.totalPrice}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>
              </div>

              {order.status === "completed" && (
                <div className="review-form">
                  <h4>Leave a Review</h4>
                  <select
                    value={reviewData[order._id]?.rating || ""}
                    onChange={(e) =>
                      handleReviewChange(order._id, "rating", e.target.value)
                    }
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  <textarea
                    rows="3"
                    placeholder="Write your review..."
                    value={reviewData[order._id]?.comment || ""}
                    onChange={(e) =>
                      handleReviewChange(order._id, "comment", e.target.value)
                    }
                  ></textarea>
                  <button
                    onClick={() =>
                      submitReview(order.orderItems[0].product, order._id)
                    }
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
