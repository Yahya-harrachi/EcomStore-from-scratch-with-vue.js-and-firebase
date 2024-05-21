<template>
  <div class="adminVue">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a
        id="show-sidebar"
        class="btn btn-sm btn-dark"
        href="#"
        @click="ShowMenu"
      >
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <div class="sidebar-item sidebar-brand">
            <a href="/">EcomStore</a>
            <div id="close-sidebar">
              <i class="fas fa-times" @click="closeMenu"></i>
            </div>
          </div>
          <div class="sidebar-item sidebar-header">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="../assets/Graphics/DefaultUser.jpg"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-name">Jhon <strong>Smith</strong></span>
              <span class="user-role"> </span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <div class="sidebar-item sidebar-search">
            <div class="input-group">
              <input
                type="text"
                class="form-control search-menu"
                placeholder="Search..."
              />
              <div class="input-group-append">
                <button class="btn btn-outline-light" type="button">
                  <i class="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu"><span>Menu</span></li>
              <li>
                <router-link to="/admin/overview"
                  ><i class="fa fa-chart-line"></i
                  ><span>Overview</span></router-link
                >
              </li>
              <li>
                <router-link to="/admin/products"
                  ><i class="fab fa-amazon"></i
                  ><span>Products</span></router-link
                >
              </li>
              <li>
                <router-link to="/admin/orders"
                  ><i class="fa fa-shopping-cart"></i
                  ><span>Orders</span></router-link
                >
              </li>

              <li>
                <a href="#" @click="LogOut()"
                  ><i class="fa fa-power-off"></i><span>Logout</span></a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import $ from "jquery";

export default {
  name: "AdminVue",
  data() {
    return {};
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").removeClass("toggled");
    },
    ShowMenu() {
      $(".page-wrapper").addClass("toggled");
    },
    LogOut() {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("currentUser");
          this.$router.replace("/");
          console.log("LogOut Done !");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.adminVue {
  font-family: "Arial", sans-serif;
}

.page-wrapper {
  display: flex;
  height: 100vh;
}

.sidebar-wrapper {
  width: 300px; /* Increased width of the sidebar */
  background-color: #27293d;
  color: #fff;
}

.sidebar-brand {
  padding: 20px 30px;
}

.sidebar-brand a {
  color: #fff;
  font-size: 1.8rem; /* Increased font size of the brand */
  font-weight: bold;
  text-decoration: none;
}

.sidebar-header {
  padding: 20px 30px;
  display: flex;
  align-items: center;
}

.user-pic img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info .user-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.user-info .user-role,
.user-info .user-status {
  font-size: 1rem;
}

.sidebar-search {
  padding: 20px 30px;
}

.search-menu {
  width: calc(100% - 48px); /* Adjusted width to accommodate the button */
  padding: 10px;
  border-radius: 5px;
  color: #fff; /* Set text color of the search input */
}

.search-menu::placeholder {
  color: #fff; /* Set placeholder color to white */
}

.sidebar-search .input-group-append .btn {
  padding: 9px 15px; /* Match padding of the search input */
}

.sidebar-menu ul {
  list-style-type: none;
  padding: 0;
}

.sidebar-menu ul li {
  padding: 10px 30px;
  cursor: pointer;
}

.sidebar-menu ul li:hover {
  background-color: #1a1c2e;
}

.sidebar-menu ul li span {
  margin-left: 10px;
}

.page-content {
  flex-grow: 1;
}

/* For smaller screens */
</style>
