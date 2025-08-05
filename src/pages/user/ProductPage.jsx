import { useEffect, useState } from "react";
import axios from "axios";
import "./productPage.css";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);

  const priceRanges = [
    { label: "All Prices", value: "" },
    { label: "Under $999", value: "0-999" },
    { label: "$1000 - $1999", value: "1000-1999" },
    { label: "$2000 & above", value: "2000-999999" },
  ];

  const fetchProducts = async () => {
    const params = { keyword: search };
    if (category) params.category = category;
    if (color) params.color = color;
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      params.minPrice = minPrice;
      params.maxPrice = maxPrice;
    }

    const res = await axios.get("http://localhost:5000/api/products", {
      params,
    });
    setProducts(res.data);

    const uniqueCategories = [...new Set(res.data.map((p) => p.category))];
    const uniqueColors = [...new Set(res.data.map((p) => p.color))];
    setCategories(uniqueCategories);
    setColors(uniqueColors);
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, color, priceRange]);

  const navToSingle = (id) => {
    navigate(`/user/singleProduct/${id}`);
  };

  return (
    <div className="shop-page">
      <h1 className="page-title glow">Explore Our Products</h1>
      <div className="filters animated-fadein">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">All Colors</option>
          {colors.map((clr, i) => (
            <option key={i} value={clr}>
              {clr}
            </option>
          ))}
        </select>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          {priceRanges.map((pr, i) => (
            <option key={i} value={pr.value}>
              {pr.label}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p, index) => (
            <div
              onClick={() => navToSingle(p._id)}
              className="product-card zoom-in"
              key={p._id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>${p.price}</p>
            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
