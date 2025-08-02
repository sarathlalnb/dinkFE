import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart, changeQty, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = +(total * 0.18).toFixed(2);
  const shipping = total > 999 ? 0 : 49;
  const grandTotal = +(total + tax + shipping).toFixed(2);

  const checkoutHandler = () => {
    if (cartItems.length === 0) return;
    navigate("/user/groupPayment", {
      state: {
        cartItems,
        total,
        tax,
        shipping,
        grandTotal,
      },
    });
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="qty-controls">
                    <button
                      onClick={() =>
                        changeQty(item._id, item.qty > 1 ? item.qty - 1 : 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item._id, item.qty + 1)}>
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Summary</h3>
            <p>Items Total: ₹{total}</p>
            <p>Tax (18%): ₹{tax}</p>
            <p>Shipping: ₹{shipping}</p>
            <h4>Grand Total: ₹{grandTotal}</h4>
            <button className="checkout-btn" onClick={checkoutHandler}>
              Proceed to Payment
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
