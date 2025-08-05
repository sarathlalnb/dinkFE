import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./singleDesign.css";
import { useCart } from "../../context/CartContext";

const SingleProduct = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(res.data);
    };
    fetch();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = `${product.name} added to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);
    setTimeout(() => {
      toast.classList.remove("show");
      document.body.removeChild(toast);
    }, 2500);
  };

  const handleBuyNow = () => {
    navigate("/user/payment", { state: { product } });
  };

  if (!product) return <div className="loading">Loading Product...</div>;

  return (
    <div className="product-page fade-in-product">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2 className="animated-title">{product.name}</h2>
        <p className="product-desc animated-desc">{product.description}</p>
        <h3 className="product-price">${product.price}</h3>
        <div className="product-btns">
          <button onClick={handleAddToCart} className="cart-btn">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="buy-btn pulse">
            Buy Now
          </button>
        </div>
        <div className="reviews-section">
          <h4>Reviews</h4>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <p className="reviewer-name">{review.name}</p>
                <p className="review-rating">⭐ {review.rating}/5</p>
                <p className="review-comment">"{review.comment}"</p>
              </div>
            ))
          ) : (
            <p className="no-reviews">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
