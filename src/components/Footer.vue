<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section about">
          <h2>About Us</h2>
          <p>
            We are a leading ecommerce store providing top-quality products and services. Our mission is to deliver exceptional value and outstanding customer experiences.
          </p>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-section contact">
          <h2>Contact Us</h2>
          <ul>
            <li><i class="fas fa-map-marker-alt"></i> 1234 Street Name, City, Country</li>
            <li><i class="fas fa-phone-alt"></i> +1 123 456 7890</li>
            <li><i class="fas fa-envelope"></i> info@example.com</li>
          </ul>
        </div>
        <div class="footer-section newsletter">
          <h2>Newsletter</h2>
          <p>Subscribe to our newsletter for the latest updates and offers.</p>
          <form @submit.prevent="subscribe">
            <input type="email" placeholder="Enter your email" v-model="email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 YourCompany. All Rights Reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
    data() {
      return {
        email: "",
      };
    },
    methods: {
      subscribe() {
        // Handle newsletter subscription logic
        alert(`Subscribed with ${this.email}`);
        this.email = "";
      }
    }
  };
  </script>
  
  <style scoped>
  .footer {
    background: linear-gradient(to right, #00416a, #e4e5e6);
    color: #fff;
    padding: 60px 20px;
    text-align: center;
  }
  
  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-section {
    flex: 1;
    margin: 20px;
    min-width: 200px;
  }
  
  .footer-section h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
  }
  
  .footer-section h2:after {
    content: '';
    width: 50px;
    height: 3px;
    background: #ff9f1c;
    position: absolute;
    bottom: -5px;
    left: 0;
  }
  
  .footer-section p {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 10px;
    font-size: 1rem;
  }
  
  .footer-section ul li i {
    margin-right: 10px;
    color: #ff9f1c;
  }
  
  .footer-section a {
    color: #ff9f1c;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-section a:hover {
    color: #fff;
    text-decoration: underline;
  }
  
  .social-icons {
    margin-top: 20px;
  }
  
  .social-icon {
    color: #ff9f1c;
    font-size: 1.5rem;
    margin: 0 10px;
    transition: color 0.3s;
  }
  
  .social-icon:hover {
    color: #fff;
  }
  
  .newsletter input {
    width: calc(100% - 110px);
    padding: 10px;
    border: none;
    border-radius: 5px 0 0 5px;
    margin-top: 10px;
  }
  
  .newsletter button {
    padding: 10px;
    border: none;
    background: #ff9f1c;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .newsletter button:hover {
    background: #e68a00;
  }
  
  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding: 20px 0;
    margin-top: 20px;
  }
  </style>
  