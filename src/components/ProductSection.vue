<template>
  <div id="ProductsSection" class="products">
    <div class="container">
      <h1 class="text-center p-5">Our Products</h1>
      <div class="row">
        <!-- Iterate over products -->
        <div class="col-md-4" v-for="(product, index) in products" :key="index">
          <div class="card product-item">
            <div :id="'carouselProduct' + index" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item" v-for="(image, imgIndex) in product.images" :key="imgIndex"
                  :class="{ 'active': imgIndex === 0 }">
                  <img :src="image" class="d-block w-100 product-image" alt="Product Image" />
                </div>
              </div>
              <button class="carousel-control-prev" type="button" :data-bs-target="'#carouselProduct' + index"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" :data-bs-target="'#carouselProduct' + index"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <p class="card-text">Price: ${{ product.price }}</p>
              <!-- You can add more dynamic fields as needed -->
              <AddToCart :image="getImage(product.images)" :p-id="product.id" :price="product.price"
                :name="product.name" @item-added="handleItemAdded">
              </AddToCart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- The Modal -->
    <div class="modal fade" ref="miniCartModal" id="miniCartModal" tabindex="-1" aria-labelledby="miniCartModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title" id="miniCartModalLabel">Shopping Cart</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <!-- Modal Body -->
          <div class="modal-body">
            <div v-for="item in cart" :key="item.productId" class="cart-item d-flex align-items-center mb-3">
              <img :src="item.productImage" class="product-img rounded mr-3" alt="Product Image">
              <div class="flex-grow-1">
                <div class="product-title">{{ item.productName }}</div>
                <div class="text-muted">Price: ${{ item.productPrice }}</div>
              </div>
              <div>
                <input type="number" class="form-control product-quantity" v-model.number="item.productQuantity" min="1"
                  @change="updateQuantity(item)">
              </div>
              <div class="text-right ml-3">
                <button class="btn btn-sm btn-danger" @click="removeItem(item)">Remove</button>
              </div>
            </div>
          </div>
          <!-- Modal Footer -->
          <div class="modal-footer">
            <div class="w-100 d-flex justify-content-between align-items-center">
              <div class="total-price">Total: ${{ total }}</div>
              <div>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Continue Shopping</button>
                <button type="button" class="btn btn-primary" @click="Checkout">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { mapState, mapMutations } from 'vuex';
import AddToCart from './AddToCart.vue';
import * as bootstrap from "bootstrap";
const db = getFirestore();

export default {
  name: "ProductsSection",
  components: {
    AddToCart,
  },
  methods: {
    ...mapMutations(['addToCart', 'removeFromCart', 'updateCartTotal']),
    getImage(images) {
      return images[0];
    },
    handleItemAdded(item) {
      this.addToCart(item);
      this.showModal();
    },
    showModal() {
      const modal = new bootstrap.Modal(this.$refs.miniCartModal);
      modal.show();
    },
    removeItem(item) {
      this.removeFromCart(item);
    },
    updateQuantity(item) {
      this.updateCartTotal();
    },
    Checkout() {
      const myModalEl = document.getElementById("miniCartModal");
      const myModal =
        bootstrap.Modal.getInstance(myModalEl) ||
        new bootstrap.Modal(myModalEl);
      myModal.hide();
      this.$router.push('/checkout')
    }
  },
  setup() {
    const products = ref([]);
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        products.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    onMounted(fetchProducts);

    return { products };
  },
  computed: {
    ...mapState(['cart', 'total'])
  }
};
</script>

<style scoped lang="scss">
.products {
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}

.product-item {
  margin-bottom: 2rem;
}

.product-image {
  height: 40vh;
  /* Make the height 40% of the viewport height */
  max-height: 400px;
  /* Ensure the height does not exceed 400px */
  width: 100%;
  /* Make the width 100% of the container */
  object-fit: cover;
  /* Ensures the image covers the area while maintaining aspect ratio */
}

.modal-body {
  max-height: 400px;
  overflow-y: auto;
}

.product-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.product-title {
  font-size: 1rem;
  font-weight: bold;
}

.product-quantity {
  width: 50px;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #28a745;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #000;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.btn-close:hover {
  opacity: 1;
}

.modal-header .btn-close:before {
  content: '\00d7';
  /* Unicode for multiplication sign (×) */
}
</style>
