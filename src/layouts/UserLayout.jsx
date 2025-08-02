import { Outlet, NavLink, useNavigate,Link } from "react-router-dom";
import "./UserLayout.css";
import { useAuth } from "../context/AuthContext";

const UserLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="user-layout">
      <header className="user-header">
        <div className="user-header-left">
          <Link to="/user" className="user-logo">
            ShopEase
          </Link>
        </div>
        <nav className="user-nav">
          <NavLink to="/user" className="user-nav-link">
            Home
          </NavLink>
          <NavLink to="/user/product" className="user-nav-link">
            Shop
          </NavLink>
          <NavLink to="/user/orders" className="user-nav-link">
            My Orders
          </NavLink>
          <NavLink to="/user/cart" className="user-nav-link">
            Cart
          </NavLink>
          <button className="user-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="user-main">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
