import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to ShopEase</h1>
          <p>Your one-stop shop for the latest styles & essentials</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
        <img
          src="https://images.template.net/85197/free-product-marketing-vector-4fsdo.jpg"
          alt="Hero"
          className="hero-img img-fluid"
        />
      </section>

      <section className="carousel-section">
        <h2>Featured Collections</h2>
        <div className="carousel">
          <img src="https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg?cs=srgb&dl=pexels-daiangan-102129.jpg&fm=jpg" />
          <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          <img src="https://img.freepik.com/free-photo/leather-shoe-collection-men-fashion-choices-generated-by-ai_188544-11870.jpg?semt=ais_hybrid&w=740" />
        </div>
      </section>

      <section className="info-section">
        <div className="info-card">
          <h3>Free Shipping</h3>
          <p>On all orders above ₹999</p>
        </div>
        <div className="info-card">
          <h3>Secure Payments</h3>
          <p>Trusted payment methods</p>
        </div>
        <div className="info-card">
          <h3>Customer Support</h3>
          <p>24/7 friendly service</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
