import { Outlet, Link, useLocation } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const location = useLocation();

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
        <header className="admin-topbar">
          <h3>Welcome, Admin</h3>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
