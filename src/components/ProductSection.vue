<template>
  <div id="ProductsSection" class="products">
    <div class="container">
      <h1 class="text-center mb-5 section-title">Our Exclusive Products</h1>
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

              <p class="card-text"><b>Price: ${{ product.price }}</b></p>
              <!-- You can add more dynamic fields as needed -->
              <AddToCart :image="getImage(product.images)" :p-id="product.id" :price="product.price"
                :name="product.name" @item-added="handleItemAdded">
              </AddToCart>
              <button class="btn btn-more-info my-3" @click="showProductModal(product)" data-bs-toggle="modal"
                data-bs-target="#productModal">
                <i class="fas fa-info-circle"></i> More Info
              </button>
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
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">{{ selectedProduct.name }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex align-items-start">
          <!-- Left column for image slider -->
          <div class="col-md-6 pe-3">
            <div :id="'carouselProductModal' + selectedProduct.id" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div v-for="(image, imgIndex) in selectedProduct.images" :key="imgIndex"
                  :class="{ 'carousel-item': true, 'active': imgIndex === 0 }">
                  <img :src="image" class="d-block w-100 product-image" alt="Product Image">
                </div>
              </div>
              <button class="carousel-control-prev" type="button"
                :data-bs-target="'#carouselProductModal' + selectedProduct.id" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button"
                :data-bs-target="'#carouselProductModal' + selectedProduct.id" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <!-- Right column for text -->
          <div class="col-md-6">
            <div class="mt-3">
              <h6 class="fw-bold mb-0">Description:</h6>
              <p class="text-muted">{{ selectedProduct.description }}</p>
              <h6 class="fw-bold mb-0">Price:</h6>
              <p class="display-4 text-danger fw-bold">${{ selectedProduct.price }}</p>
              <!-- Star rating -->
              <h5 class="fw-bold mb-0 tags" >Tags:</h5>
              <p class="text-muted">
                <span v-for="(tag, index) in selectedProduct.tags" :key="index" class="badge bg-info text-dark me-2">{{ tag }}</span>
              </p>
              <div class="mb-3">
                <span class="fa fa-star checked" style="color: gold;"></span>
                <span class="fa fa-star checked" style="color: gold;"></span>
                <span class="fa fa-star checked" style="color: gold;"></span>
                <span class="fa fa-star checked" style="color: gold;"></span>
                <span class="fa fa-star-half-alt" style="color: gold;"></span>
              </div>
              <!-- Reviews -->
              <div class="reviews">
                <h6 class="fw-bold mb-2">Customer Reviews:</h6>
                <div class="review mb-3" v-for="(review, index) in reviews" :key="index">
                  <strong>{{ review.name }}</strong>
                  <p class="text-muted mb-1">{{ review.comment }}</p>
                  <div>
                    <span v-for="star in Math.floor(review.rating)" :key="star" class="fa fa-star checked" style="color: gold;"></span>
                    <span v-if="review.rating % 1 !== 0" class="fa fa-star-half-alt" style="color: gold;"></span>
                    <span v-for="emptyStar in 5 - Math.ceil(review.rating)" :key="emptyStar" class="fa fa-star" style="color: lightgray;"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
  data() {
    return {
      selectedProduct: [],
      reviews: [
        {
          name: 'Jane Doe',
          comment: 'Amazing product! High quality and fast shipping.',
          rating: 5,
        },
        {
          name: 'John Smith',
          comment: 'Good value for money. Highly recommend!',
          rating: 4.5,
        },
      ],
    }
  },
  computed: {
    tagsArray() {
      return this.selectedProduct.tags ? this.selectedProduct.tags.split(',').map(tag => tag.trim()) : [];
    }
  },
  components: {
    AddToCart,
  },
  methods: {
    ...mapMutations(['addToCart', 'removeFromCart', 'updateCartTotal']),
    getImage(images) {
      if (images && images.length > 0) {
        return images[0];
      } else {
        // Return a placeholder image or handle the empty case as needed

      }
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
    },
    showProductModal(product) {
      this.selectedProduct = product;
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
.section-title {
  background-color: #673ab7;
  color: white;
  padding: 1rem;
  border-radius: 5px;
}

.products {
  margin-top: 10rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}

.btn-more-info {
  background-color: #080a02;
  /* Info color */
  color: white;margin-left: 8.25rem;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.btn-more-info i {
  margin-right: 8px;
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
  max-height: 1000px;
  overflow-y: auto;
}

.tags{
  margin-top: 1rem;
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

.product-image {
  height: 60vh;
  object-fit: cover;
}

.checked {
  color: gold;
}

.review {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
}

.review p {
  margin: 0;
}
</style>
