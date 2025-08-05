import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./PaymentPage.css";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const product = state?.product;

  const [form, setForm] = useState({
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemsPrice = product.price;
    const taxPrice = +(itemsPrice * 0.13).toFixed(2);
    const shippingPrice = itemsPrice > 50 ? 0 : 8;
    const totalPrice = +(itemsPrice + taxPrice + shippingPrice).toFixed(2);

    const orderData = {
      orderItems: [
        {
          name: product.name,
          qty: 1,
          image: product.image,
          price: product.price,
          product: product._id,
        },
      ],
      shippingAddress: {
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
      paymentMethod: "Card",
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    await axios.post("http://localhost:5000/api/orders", orderData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    toast.success("Order placed successfully!");
    // navigate("/user/orders");
  };

  if (!product) return <div>No product found</div>;

  return (
    <div className="payment-page">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>

        <div className="summary">
          <p>
            <strong>Product:</strong> {product.name}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
        </div>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          required
        />

        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={form.postalCode}
          onChange={handleChange}
          required
        />

        <label>Country</label>
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        />

        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          maxLength={16}
          required
        />

        <div className="card-details">
          <div>
            <label>Expiry</label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          <div>
            <label>CVC</label>
            <input
              className="w-75"
              type="text"
              name="cvc"
              value={form.cvc}
              onChange={handleChange}
              placeholder="123"
              maxLength={3}
              required
            />
          </div>
        </div>

        <button type="submit" className="pay-btn">
          Pay ${product.price}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
