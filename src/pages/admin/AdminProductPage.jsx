import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProductsPage.css";
import { useAuth } from "../../context/AuthContext";

const AdminProductsPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    color: "",
    countInStock: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    for (const key in form) {
      productData.append(key, form[key]);
    }
    if (imageFile) {
      productData.append("image", imageFile);
    }

    if (editing) {
      await axios.put(
        `http://localhost:5000/api/products/${editing}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } else {
      await axios.post("http://localhost:5000/api/products", productData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }

    setForm({
      name: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      countInStock: "",
      description: "",
      image: "",
    });
    setImageFile(null);
    setEditing(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      color: product.color,
      countInStock: product.countInStock,
      description: product.description,
      image: product.image,
    });
    setEditing(product._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    fetchProducts();
  };

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="admin-products">
      <h2>
        <i className="fas fa-box"></i> Manage Products
      </h2>

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          required
        />
        {/* <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        /> */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="fashion">Fashion</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home</option>
          <option value="beauty">Beauty</option>
          <option value="sports">Sports</option>
          <option value="automotive">Automotive</option>
          <option value="books">Books</option>
          <option value="grocery">Grocery</option>
          <option value="toys">Toys</option>
          <option value="health">Health</option>
        </select>

        <input
          name="color"
          placeholder="Color"
          value={form.color}
          onChange={handleChange}
          required
        />
        <input
          name="countInStock"
          placeholder="Stock"
          type="number"
          value={form.countInStock}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          required={!editing}
        />
        <button type="submit">
          {editing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>${prod.price}</td>
              <td>{prod.countInStock}</td>
              <td>{prod.category}</td>
              <td>{prod.brand}</td>
              <td>{prod.color}</td>
              <td>
                <button onClick={() => handleEdit(prod)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button onClick={() => handleDelete(prod._id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={currentPage === idx + 1 ? "active" : ""}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
