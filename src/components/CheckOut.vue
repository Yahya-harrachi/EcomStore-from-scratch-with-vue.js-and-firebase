<template>
  <NavBar></NavBar>
  <div class="checkout-page">
    <div class="container">
      <h1 class="page-title">Checkout</h1>
      <div v-if="cart && cart.length > 0" class="checkout-content">
        <!-- Left Side: Product Info -->
        <div class="checkout-items">
          <div v-for="(item, index) in cart" :key="index" class="checkout-item">
            <div class="item-image">
              <img :src="item.productImage" alt="Product Image" />
            </div>
            <div class="item-details">
              <h3 class="item-name">{{ item.productName }}</h3>
              <p class="item-price">$ {{ item.productPrice }}</p>
              <div class="item-quantity">
                <span>Quantity:</span>
                <input
                  type="number"
                  v-model.number="item.productQuantity"
                  min="1"
                  class="quantity-input"
                />
              </div>
            </div>
            <button class="btn-remove" @click="removeItem(item)">
              <i class="fas fa-trash-alt"></i> Remove
            </button>
          </div>
        </div>

        <!-- Right Side: Checkout Info -->
        <div class="checkout-info">
          <div class="total-section">
            <div class="total">
              <span>Total:</span>
              <span class="total-price">$ {{ getTotalPrice }}</span>
            </div>
            <div class="payment-info">
              <h2 class="payment-title">Payment Information</h2>
              <div class="cash-on-delivery">
                <p>Pay with Cash on Delivery</p>
                <form @submit.prevent="processCheckout">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <div class="input-icon">
                      <i class="fas fa-user"></i>
                      <input
                        type="text"
                        id="name"
                        v-model="userInfo.name"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="email">Email Address</label>
                    <div class="input-icon">
                      <i class="fas fa-envelope"></i>
                      <input
                        type="email"
                        id="email"
                        v-model="userInfo.email"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <div class="input-icon">
                      <i class="fas fa-phone"></i>
                      <input
                        type="tel"
                        id="phone"
                        v-model="userInfo.phone"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="city">City</label>
                    <div class="input-icon">
                      <i class="fas fa-city"></i>
                      <input
                        type="text"
                        id="city"
                        v-model="userInfo.city"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" class="btn-checkout">
                    <i class="fas fa-shopping-cart"></i> Order Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="empty-cart-message">Your cart is empty.</p>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { db, storage } from "../firebase";
import { collection, addDoc, Timestamp  } from "firebase/firestore"; // Import Timestamp from firebase

export default {
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      userInfo: {
        name: "",
        email: "",
        phone: "",
        city: "",
      },
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart || [];
    },
    getTotalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.productPrice * item.productQuantity,
        0
      );
    },
  },
  methods: {
    removeItem(item) {
      this.$store.commit("removeFromCart", item);
    },
    async processCheckout() {
      Swal.fire({
        title: "You want to Order Now ??",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Order Now",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Add the current date to the order
            const currentDate = Timestamp.now(); // Get the current date

            // Send order details via EmailJS
            const templateParams = {
              to_name: this.userInfo.name,
              email: this.userInfo.email,
              //total: this.getTotalPrice,
            };

            await emailjs.send(
              "service_r5bpvd8",
              "template_tpy7cj8",
              templateParams,
              "Gofzx4XaH9hNbpD5V"
            );

            // Add order to the database
            await addDoc(collection(db, "Orders"), {
              userInfo: this.userInfo,
              products: this.cart,
              totalPrice: this.getTotalPrice,
              date: currentDate, // Store the current date with the order
              status: "Processing"
            });

            Swal.fire({
              icon: "success",
              title: "Ordered successfully",
              text: "Wait for our confirmation",
            });
            this.$router.replace("success");
          } catch (error) {
            console.error("Error processing order: ", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      });
    },
  },
};
</script>


<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.checkout-page {
  background-color: #f9f9f9;
  padding: 50px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
}

.checkout-content {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.checkout-items {
  flex: 1;
  margin-right: 20px;
}

.checkout-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}

.item-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.item-price {
  font-size: 1rem;
  font-weight: bold;
}

.item-quantity {
  margin-top: 10px;
}

.quantity-input {
  width: 50px;
}

.btn-remove {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.checkout-info {
  flex: 1;
  max-width: 400px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.total-section {
  margin-bottom: 20px;
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.total-price {
  font-size: 1.2rem;
  font
  .total-price {
    font-size: 1.2rem;
    font-weight: bold;
}
}
.payment-info {
    margin-top: 20px;
}

.payment-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.cash-on-delivery {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cash-on-delivery p {
    font-size: 1.2rem;
    margin-bottom: 10px;
    text-align: center;
}

.cash-on-delivery .btn-checkout {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.input-icon {
    position: relative;
}

.input-icon i {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #aaa;
}

.form-control {
    width: 100%;
    padding: 10px 10px 10px 35px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 1rem;
}

.btn-checkout {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.empty-cart-message {
    font-size: 1.2rem;
    text-align: center;
}
</style>
