import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Admin from "../views/Admin.vue";
import OverView from "../views/OverView.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: "overview",
        name: "overview",
        component: OverView,
      },
      {
        path: "products",
        name: "products",
        component: Products,
      },
      {
        path: "orders",
        name: "orders",
        component: Orders,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log("Destination Route: ", to.name);
  console.log("Requires Authentication: ", requiresAuth);
  console.log("Current User: ", currentUser);

  if (requiresAuth && !currentUser) {
    // Redirect to home if user is not authenticated and accessing a protected route
    console.log("User is not authenticated. Redirecting to Home.");
    next("/");
  } else {
    next();
  }
});

export default router;
