import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const location = useLocation();
  
  const { logout } = useAuth();
  const navigate = useNavigate();
    const handleLogout = () => {
      logout();
      navigate("/login");
    };


  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>⚙️ DinkPanel</h2>
        <nav>
          <Link
            to="/admin"
            className={location.pathname === "/admin" ? "active" : ""}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={location.pathname.includes("products") ? "active" : ""}
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className={location.pathname.includes("orders") ? "active" : ""}
          >
            Orders
          </Link>
          <Link
            to="/admin/users"
            className={location.pathname.includes("users") ? "active" : ""}
          >
            Users
          </Link>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar d-flex  justify-content-between">
          <h3>Welcome, Admin</h3>
          <button className="user-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
