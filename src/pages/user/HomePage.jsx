import { Link } from "react-router-dom";
import "./HomePage.css";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
      card.classList.add("fade-in-up");
    });
  }, []);

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-text">
          <h1 className="glow-text">
            Welcome to DinkMart <i className="fa-solid fa-basket-shopping"></i>
          </h1>
          <p className="hero-sub">Latest Trends, Best Prices</p>
          <Link
            to={"/user/product"}
            style={{ textDecoration: "none" }}
            className="cta-button"
          >
            Explore Now
          </Link>
        </div>
        <div className="hero-bg"></div>
      </section>

      <section className="carousel-section">
        <h2 className="section-title">Featured Collections</h2>
        <div className="carousel">
          <img src="https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg" />
          <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg" />
          <img src="https://img.freepik.com/free-photo/leather-shoe-collection-men-fashion-choices-generated-by-ai_188544-11870.jpg" />
        </div>
      </section>

      <section className="card-grid">
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/992/992700.png" />
          <h3>New Arrivals</h3>
          <p>Trendy & stylish picks just for you</p>
        </div>
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/263/263115.png" />
          <h3>Best Sellers</h3>
          <p>Loved by thousands of happy customers</p>
        </div>
        <div className="feature-card">
          <img src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png" />
          <h3>Big Deals</h3>
          <p>Unlock jaw-dropping offers & discounts</p>
        </div>
      </section>

      <section className="video-banner">
        <video autoPlay loop muted className="promo-video">
          <source
            src="https://videos.pexels.com/video-files/8571770/8571770-uhd_2732_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="video-overlay">
          <h1>Unbox Excitement</h1>
          <p>Experience premium shopping, like never before</p>
        </div>
      </section>

      <section className="info-section">
        <div className="info-card">
          <i className="fa-solid fa-truck-fast"></i>
          <h3>Free Shipping</h3>
          <p>On orders above $50</p>
        </div>
        <div className="info-card">
          <i className="fa-solid fa-shield"></i>
          <h3>Secure Payments</h3>
          <p>End-to-end encryption</p>
        </div>
        <div className="info-card">
          <i className="fa-solid fa-users"></i>
          <h3>Trusted by many</h3>
          <p>We're always here for you</p>
        </div>
        <div className="info-card">
          <i className="fa-solid fa-rotate-left"></i>
          <h3>Awesome Collections</h3>
          <p>Eye Locking Collections</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
