import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./authDesign.css";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      login(res.data);
      res.data.isAdmin ? navigate("/admin") : navigate("/user");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title ">Welcome Back to DinkStore</h2>
        <p className="login-sub">Sign in to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
        <Link to={"register"} className="nav-link mt-2">
          {" "}
          Dont Have an account? Register Here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
