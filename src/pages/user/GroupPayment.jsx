import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentPage.css";
import { useAuth } from "../../context/AuthContext";


const GroupPayment = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const {user} = useAuth()
  console.log(user)

  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = +(total * 0.18).toFixed(2);
  const shipping = total > 999 ? 0 : 49;
  const grandTotal = +(total + tax + shipping).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderPayload = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty,
        product: item._id,
      })),
      shippingAddress: address,
      paymentMethod: "Stripe Dummy",
      taxPrice: tax,
      shippingPrice: shipping,
      totalPrice: grandTotal,
    };

    const res = await axios.post(
      "http://localhost:5000/api/orders",
      orderPayload,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(res)
    clearCart();
    navigate("/user/orders");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <h4>Shipping Address</h4>
        <input
          type="text"
          placeholder="Address"
          value={address.address}
          onChange={(e) => setAddress({ ...address, address: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={address.postalCode}
          onChange={(e) =>
            setAddress({ ...address, postalCode: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          required
        />

        <div className="summary">
          <p>Items Total: ₹{total}</p>
          <p>Tax (18%): ₹{tax}</p>
          <p>Shipping: ₹{shipping}</p>
          <h3>Total: ₹{grandTotal}</h3>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default GroupPayment;
