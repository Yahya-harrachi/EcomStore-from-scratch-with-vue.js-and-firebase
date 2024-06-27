<template>
  <div class="main-gui home">
    <div class="container-fluid my-5 ">
      <div class="row align-items-center">
        <!-- Left Side Content -->
        <div class="col-lg-6 order-lg-1 order-2 text-center text-lg-left px-5">
          <h1 class="display-4 mb-4">Welcome to ScaleClick Store</h1>
          <p class="lead">
            Discover the best products curated just for you. Enjoy seamless shopping with our intuitive platform and
            exclusive offers.
          </p>
          <div class="features mt-4">
            <div class="feature">
              <i class="fas fa-truck"></i>
              <span>Fast Shipping</span>
            </div>
            <div class="feature">
              <i class="fas fa-lock"></i>
              <span>Secure Payments</span>
            </div>
            <div class="feature">
              <i class="fas fa-headset"></i>
              <span>24/7 Support</span>
            </div>
          </div>
          <div class="mt-5">
            <button class="btn btn-primary mr-3" @click="scrollToProducts">Shop Now</button>
            <button class="btn btn-outline-secondary" @click="scrollToFaq">Learn More</button>
          </div>
        </div>
        <!-- Right Side Image -->
        <div class="col-lg-6 order-lg-2 order-1 d-flex justify-content-center">
          <div class="image-container">
            <!-- Make sure to adjust the path to your SVG file -->
            <img src="@/assets/Graphics/home.png" alt="Ecommerce" class="img-fluid rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainGUI",
  methods: {
    scrollToProducts() {
      const productsSection = document.getElementById("ProductsSection");
      if (productsSection) {
        // Scroll to the products section with smooth behavior
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 
    scrollToFaq() {
      const faqSection = document.getElementById("FAQSection");
      if (faqSection) {
        // Scroll to the FAQ section with smooth behavior
        faqSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.main-gui {
  margin: 2rem;
  /* Added margin around the main container */
}

.container-fluid {
  padding-top: 0;
}

h1.display-4 {
  font-size: 2.5rem;
  /* Reduced font size */
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
  /* Adjusted margin bottom */
}

p.lead {
  font-size: 1.25rem;
  /* Reduced font size */
  color: #555;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  /* Adjusted margin bottom */
}

.features {
  display: flex;
  justify-content: center;
  gap: 20px;
  /* Reduced gap */
  margin-top: 15px;
  /* Adjusted margin top */
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  /* Reduced font size */
  color: #333;
  transition: transform 0.3s;
  cursor: pointer;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature i {
  font-size: 1.5rem;
  /* Reduced icon size */
  color: #007bff;
  margin-bottom: 8px;
  /* Adjusted margin bottom */
}

.btn {
  font-size: 1rem;
  /* Adjusted button font size */
  padding: 0.75rem 1.5rem;
  /* Adjusted padding */
  margin: 0 0.25rem;
  /* Adjusted margin */
  transition: background-color 0.3s, color 0.3s;

  &.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.btn-outline-secondary {
    border: 2px solid #6c757d;
    color: #6c757d;

    &:hover {
      background-color: #6c757d;
      color: #fff;
    }
  }
}

.image-container {
  max-width: 100%;
  text-align: center;
  background-color: #ffffff;
  /* Light gray background color */
  padding: 15px;
  /* Adjusted padding */
  border-radius: 15px;
  /* Add border radius */
}

img.img-fluid {
  max-width: 70%;
  /* Reduced the width of the image */
  height: auto;
  border-radius: 10px;
}

.home {
  padding-top: 1rem;
  margin-top: 5rem;
  /* Added top margin */
  margin-bottom: 15rem;
  /* Added bottom margin */
}
</style>
