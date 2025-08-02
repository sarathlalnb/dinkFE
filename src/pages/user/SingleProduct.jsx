import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./productPage.css";
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
    alert("Added to cart");
  };

  const handleBuyNow = () => {
    navigate("/user/payment", { state: { product } });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-page">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-desc">{product.description}</p>
        <h3>₹{product.price}</h3>
        <div className="product-btns">
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleBuyNow} className="buy-btn">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
