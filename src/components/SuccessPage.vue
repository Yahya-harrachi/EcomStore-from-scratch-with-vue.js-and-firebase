<template>
  <NavBar></NavBar>
  <div class="success-page">
    <h1>Payment Successful!</h1>
    <p>Thank you for your purchase. Your transaction was successful.</p>
    <div class="products-purchased">
      <h2>Products Ordered:</h2>
      <ul>
        <li v-for="(item, index) in cart" :key="index" class="product-item">
          <div class="product-details">
            <div class="product-info">
              <p><strong>Name:</strong> {{ item.productName }}</p>
              <p><strong>Price:</strong> ${{ item.productPrice }}</p>
              <!-- Add more product details as needed -->
            </div>
            <div class="product-image">
              <img :src="item.productImage" alt="Product Image" />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="total-price">
      <p>Total Price: ${{ getTotalPrice }}</p>
    </div>
    <p>A confirmation email has been sent to your email address. We will contact you shortly to confirm your order and arrange shipment.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
export default {
  name: 'SuccessPage',
  components:{
    NavBar
  },
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart || [];
    },
    
  },
};
</script>

<style scoped>
.success-page {
  text-align: center;
  padding: 50px;
}

.products-purchased {
  margin-top: 30px;
}

.product-item {
  list-style: none;
  margin-bottom: 20px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.product-info {
  flex-grow: 1;
  text-align: left;
}

.product-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.total-price {
  margin-top: 30px;
}

.total-price img {
  max-width: 100%;
  margin-bottom: 10px;
}
</style>
