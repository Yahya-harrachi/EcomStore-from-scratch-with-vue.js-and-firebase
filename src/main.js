import { createApp } from "vue";
import App from "./App.vue";
import store from './store';
import router from "./router";
import "bootstrap";
import jQuery from "jquery";
import "./assets/appStyle.scss";
import NavBar from "./components/NavBar.vue";
import MainGUI from "./components/MainGUI.vue";
import addToCart from "./components/AddToCart.vue";
import ProductsSection from "./components/ProductSection.vue";
import Admin from "./views/Admin.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import Vue2Filters from "vue2-filters";

window.$ = window.jQuery = jQuery;


//Vue.use(Vue2Filters)

// Firebase Authentication
const auth = getAuth();

// Global state to store current user
const userState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")),
};

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    userState.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    console.log("User is signed in:", user);
  } else {
    userState.currentUser = null;
    localStorage.removeItem("currentUser");
    console.log("User is signed out");
  }
});



// Create the Vue app instance
const app = createApp(App);

// Use the router
app.use(router);
app.use(store);

// Register components globally
app.component("NavBar", NavBar);
app.component("MainGUI", MainGUI);
app.component("AdminVue", Admin);
app.component("ProductsSection", ProductsSection);
app.component("addToCart", addToCart);

// Provide user state globally
app.provide("userState", userState);

if (process.env.NODE_ENV === 'development') {
  app.config.devtools = true
}
// Mount the app after ensuring auth state is resolved
app.mount("#app");
