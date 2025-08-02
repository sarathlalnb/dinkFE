import { useEffect, useState } from "react";
import axios from "axios";
import "./productPage.css";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
    const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products", {
        params: {
          search,
          category,
          color,
          priceRange,
        },
      });
      setProducts(res.data);
    };
    fetchProducts();
  }, [search, category, color, priceRange]);

  const navToSingle =(id)=>{
    navigate(`/user/singleProduct/${id}`);
  }

  return (
    <div className="shop-page">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="shoes">Shoes</option>
          <option value="clothes">Clothes</option>
          <option value="accessories">Accessories</option>
        </select>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">All Colors</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="blue">Blue</option>
        </select>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-999">Under ₹999</option>
          <option value="1000-1999">₹1000 - ₹1999</option>
          <option value="2000-999999">₹2000 & above</option>
        </select>
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div onClick={()=>navToSingle(p._id)} className="product-card" key={p._id}>
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
