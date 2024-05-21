<template>
  <div
    id="Login"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="LoginLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="LoginLabel"
            class="modal-title d-flex justify-content-center"
            style="
              color: #007bff;
              font-size: 1.5rem;
              font-weight: bold;

              word-break: keep-all;
            "
          >
            Welcome Back!
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Sign-in form -->
          <div v-if="mode === 'signin'">
            <form>
              <div class="mb-3 text-start">
                <label for="email" class="form-label">Email address :</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="Enter email"
                  style="font-size: 0.9rem"
                />
              </div>
              <div class="mb-3 text-start">
                <label for="password" class="form-label">Password :</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  style="font-size: 0.9rem"
                  @keyup.enter="Login()"
                />
              </div>
              <a type="submit" class="btn btn-success" @click="Login()">
                Sign In
              </a>
            </form>
          </div>
          <!-- Sign-up form -->
          <div v-else>
            <form>
              <div class="mb-3 text-start">
                <label for="name" class="form-label">Name :</label>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  class="form-control"
                  placeholder="Enter your name"
                  style="font-size: 0.9rem"
                />
              </div>
              <div class="mb-3 text-start">
                <label for="email" class="form-label">Email address :</label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  class="form-control"
                  placeholder="Enter email"
                  style="font-size: 0.9rem"
                />
              </div>
              <div class="mb-3 text-start">
                <label for="password" class="form-label">Password :</label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  style="font-size: 0.9rem"
                />
              </div>
              <div class="mb-3 text-start">
                <label for="confirmPassword" class="form-label"
                  >Confirm Password :</label
                >
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  class="form-control"
                  placeholder="Confirm password"
                  style="font-size: 0.9rem"
                />
              </div>

              <a type="submit" class="btn btn-success" @click="CreateAccount()">
                Sign Up
              </a>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <div v-if="mode === 'signin'">Don't Have any Account ?</div>
          <div v-else>Already Have an Account ?</div>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="switchMode"
          >
            {{ mode === "signin" ? "Sign Up" : "Sign In" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { auth } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import * as bootstrap from "bootstrap"; // Import all Bootstrap components

export default {
  name: "LoginModal",
  setup() {
    const userState = inject("userState");
    return { userState };
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mode: "signin", // Default mode is sign-in
    };
  },
  methods: {
    switchMode() {
      this.mode = this.mode === "signin" ? "signup" : "signin";
    },
    // Assuming this code is inside a Vue component
    async Login() {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        // Signed in successfully
        const user = userCredential.user;
        console.log("Logged in user:", user);

        // Store user information in local storage
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Update the global state
        if (this.userState) {
          this.userState.currentUser = user;
        } else {
          console.error("userState is undefined");
        }

        // Redirect to the admin page
        const myModalEl = document.getElementById("Login");
        const myModal =
          bootstrap.Modal.getInstance(myModalEl) ||
          new bootstrap.Modal(myModalEl);
        myModal.hide();
        this.$router.replace("/admin");
      } catch (error) {
        // Handle login error
        console.error("Login error:", error);
        console.log("Error code:", error.code);
        console.log("Error message:", error.message);
      }
    },

    async CreateAccount() {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        // If user creation is successful
        if (response && response.user) {
          // Close the modal
          const myModalEl = document.getElementById("Login");
          const myModal =
            bootstrap.Modal.getInstance(myModalEl) ||
            new bootstrap.Modal(myModalEl);
          myModal.hide();
          // Navigate to the admin page
          this.$router.replace("admin");
        } else {
          throw new Error("Unable to register user");
        }
      } catch (error) {
        console.error("Error creating account:", error.message);
        // Handle error appropriately, e.g., display an error message to the user
      }
    },
  },
};
</script>

<style scoped lang="scss">
/* Add any necessary custom styles here */
</style>
,
