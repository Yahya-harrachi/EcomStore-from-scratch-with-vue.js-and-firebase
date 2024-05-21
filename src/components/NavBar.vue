<template>
  <div class="NavBar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">EcomStore</a>
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
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>
      </div>
      <form class="my-2 my-lg-0 d-flex">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <a
          class="btn btn-outline-success my-2 my-sm-0"
          style="margin-left: 10px"
          data-bs-toggle="modal"
          data-bs-target="#Login"
        >
          Login
        </a>
      </form>
    </nav>

    <LoginModal></LoginModal>
  </div>
</template>

<script>
import LoginModal from "./LoginModal.vue";
export default {
  name: "NavBar",
  components: { LoginModal },
};
</script>

<style scoped lang="scss">
.NavBar {
  padding: 20px 70px;
}
</style>
