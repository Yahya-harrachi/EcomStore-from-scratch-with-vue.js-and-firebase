<template>
    <NavBar></NavBar>
    <div class="checkout-page">
      <div class="container">
        <h1 class="page-title">Checkout</h1>
        <div v-if="cart.length > 0" class="checkout-content">
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
                <form @submit.prevent="processCheckout">
                  <div class="form-group">
                    <label for="cardNumber">Card Number</label>
                    <div class="input-icon">
                      <i class="fas fa-credit-card"></i>
                      <input
                        type="text"
                        id="cardNumber"
                        v-model="payment.cardNumber"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="expiryDate">Expiry Date</label>
                    <div class="input-icon">
                      <i class="fas fa-calendar-alt"></i>
                      <input
                        type="text"
                        id="expiryDate"
                        v-model="payment.expiryDate"
                        class="form-control"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="cvv">CVV</label>
                    <div class="input-icon">
                      <i class="fas fa-lock"></i>
                      <input
                        type="text"
                        id="cvv"
                        v-model="payment.cvv"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="cardholderName">Cardholder Name</label>
                    <div class="input-icon">
                      <i class="fas fa-user"></i>
                      <input
                        type="text"
                        id="cardholderName"
                        v-model="payment.cardholderName"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" class="btn-checkout">
                    <i class="fas fa-shopping-cart"></i> Pay with your Credit Card
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="empty-cart-message">Your cart is empty.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from "@/components/NavBar.vue";
  
  export default {
    components: {
      NavBar, // Register NavBar component
    },
    data() {
      return {
        payment: {
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          cardholderName: "",
        },
      };
    },
    computed: {
      cart() {
        return this.$store.state.cart;
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
      processCheckout() {
        // Add your checkout logic here
        console.log("Checkout button clicked!", this.payment);
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
    gap: 30px; /* Added space between product info and payment section */
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
    font-weight: bold;
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
    box-sizing: border-box; /* Ensures padding and border are included in total width and height */
    font-size: 1rem; /* Improved font size for better readability */
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
  