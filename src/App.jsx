import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/user/HomePage";
import ProductPage from "./pages/user/ProductPage";
import DashboardPage from "./pages/admin/DashboardPage";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/user/LoginPAge";
import RegisterPage from "./pages/user/RegisterPage";
import SingleProduct from "./pages/user/SingleProduct";
import PaymentPage from "./pages/user/PaymentPage";
import OrdersPage from "./pages/user/OrdersPage";
import CartPage from "./pages/user/CartPage";
import GroupPayment from "./pages/user/GroupPayment";
import AdminProductsPage from "./pages/admin/AdminProductPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPAge";
import AdminUsersPage from "./pages/admin/AdminUsers";

const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginPage />
            ) : (
              <Navigate to={user.isAdmin ? "/admin" : "/user"} />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/user/product" element={<ProductPage />} />
          <Route path="/user/singleProduct/:id" element={<SingleProduct />} />
          <Route path="/user/payment" element={<PaymentPage />} />
          <Route path="/user/orders" element={<OrdersPage />} />
          <Route path="/user/cart" element={<CartPage />} />
          <Route path="/user/groupPayment" element={<GroupPayment />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
