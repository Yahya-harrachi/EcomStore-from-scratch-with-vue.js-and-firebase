<template>
  <div class="NavBar" :class="{ 'scrolled': isScrolled }">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <!-- Site Name -->
        <router-link to="/" class="navbar-brand">
          ScaleClick Store
        </router-link>
        <!-- Toggle Button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <!-- Navbar Links -->
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                <i class="fas fa-home"></i> Home
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="scrollToProducts">
                <i class="fas fa-store"></i> Products
              </a>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">
                <i class="fas fa-info-circle"></i> About
              </router-link>
            </li>
          </ul>
          <!-- Search Form -->
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <!-- Login Button -->
          <button
            class="btn btn-outline-warning ms-3"
            data-bs-toggle="modal"
            data-bs-target="#Login"
          >
            <i class="fas fa-sign-in-alt"></i> Admin
          </button>
          <!-- Cart icon -->
          <router-link to="/checkout" class="nav-link cart-link">
            <i class="fas fa-shopping-cart fa-lg"></i>
          </router-link>
        </div>
      </div>
    </nav>
    <LoginModal></LoginModal>
  </div>
</template>

<script>
import LoginModal from "./LoginModal.vue";

export default {
  name: "NavBar",
  components: {
    LoginModal
  },
  data() {
    return {
      isScrolled: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 50) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    },
    scrollToProducts() {
      const productsSection = document.getElementById("ProductsSection");
      if (productsSection) {
        // Scroll to the products section with smooth behavior
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 
  }
};
</script>

<style scoped>
.NavBar {
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background-color 0.3s, padding 0.3s; /* Add transition effects */
}

.navbar {
  height: 80px; /* Make the navbar bigger */
  background-color: #6c3dbe;
  transition: height 0.3s, background-color 0.3s; /* Add transition effects */
}

.navbar-brand {
  font-weight: bold; /* Make the site name bold */
  color: #ffd600;
}
.navbar-brand:hover{
  color: #d3b105;
}
.nav-link {
  color: #fff; /* Adjust link color */
  font-weight: 500; /* Add font weight */
  display: flex;
  align-items: center; /* Center icon vertically */
  cursor: pointer;
}
.nav-link:hover{
  color: #ffd600;
}
.nav-link i {
  margin-right: 5px; /* Add space between icon and text */
}

.btn {
  font-size: 1rem; /* Adjust button font size */
}

/* Cart icon styling */
.nav-link .fa-shopping-cart {
  font-size: 1.5rem; /* Increase icon size */
  padding: 0.25rem; /* Add padding around the icon */
  transition: color 0.3s; /* Add transition effect for color change */
}

/* Hover effect for cart icon */
.cart-link:hover .fa-shopping-cart {
  color: #ffd600; /* Change color on hover */
}

/* Independent padding for cart icon */
.cart-link .fa-shopping-cart {
  padding-left: 10px; /* Add left padding to separate from text */
}

/* Change navbar background color and height when scrolled */
.NavBar.scrolled .navbar {
  background-color: #673ab7; /* Change background color when scrolled */
  height: 65px; /* Reduce height when scrolled */
}

/* Override modal backdrop styles */
.modal-backdrop {
  background-color: transparent; /* Make the backdrop transparent */
}
</style>
