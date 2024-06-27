<template>
  <div></div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss"></style>

<template>
  <div id="ProductsSection" class="products">
    <div class="container py-5">
      <h1 class="text-center mb-5 section-title">Our Exclusive Products</h1>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else class="row">
        <div class="col-md-4" v-for="(product, index) in products" :key="index">
          <div class="card product-item shadow">
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
              <div class="d-flex justify-content-center mb-3">
                <div v-for="star in 5" :key="star" class="mx-1">
                  <i class="fas fa-star" :class="{ 'text-warning': star <= product.rating }"></i>
                </div>
              </div>
              <p class="card-text">{{ product.description }}</p>
              <p class="card-text">Price: ${{ product.price }}</p>
              <button class="btn btn-primary" @click="addToCart(product)">
                <i class="fas fa-cart-plus mr-2"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{ selectedProduct.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div :id="'carouselProductModal' + selectedProduct.id" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item" v-for="(image, imgIndex) in selectedProduct.images" :key="imgIndex"
                  :class="{ 'active': imgIndex === 0 }">
                  <img :src="image" class="d-block w-100 product-image" alt="Product Image" />
                </div>
              </div>
              <button class="carousel-control-prev" type="button" :data-bs-target="'#carouselProductModal' + selectedProduct.id"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" :data-bs-target="'#carouselProductModal' + selectedProduct.id"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <div class="mt-3">
              <p>{{ selectedProduct.description }}</p>
              <p>Price: ${{ selectedProduct.price }}</p>
              <div class="d-flex justify-content-center mb-3">
                <div v-for="star in 5" :key="star" class="mx-1">
                  <i class="fas fa-star" :class="{ 'text-warning': star <= selectedProduct.rating }"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addToCart(selectedProduct)">
              <i class="fas fa-cart-plus mr-2"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { mapMutations, mapState } from 'vuex';

const db = getFirestore();

export default {
  name: "ProductsSection",
  data() {
    return {
      loading: true,
      products: [],
      selectedProduct: {}
    };
  },
  methods: {
    ...mapMutations(['addToCart']),
    fetchProducts() {
      getDocs(collection(db, 'products'))
        .then(querySnapshot => {
          this.products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showProductModal(product) {
      this.selectedProduct = product;
      const modal = new bootstrap.Modal(document.getElementById('productModal'));
      modal.show();
    },
    addToCart(product) {
      console.log('Adding to cart:', product);
      this.$store.commit('addToCart', product);
    }
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    ...mapState(['cart', 'total'])
  }
};
</script>

<style scoped lang="scss">
.products {
  margin-top: 7rem;
  padding-bottom: 3rem;
  background-color: #f9f9f9;
}

.section-title {
  background-color: #673ab7;
  color: white;
  padding: 1rem;
  border-radius: 5px;
}

.product-item {
  margin-bottom: 2rem;
}

.product-image {
  height: 40vh;
  max-height: 400px;
  width: 100%;
  object-fit: cover;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
}

.btn {
  font-size: 1rem;
}

/* Center and color stars */
.d-flex .fa-star {
  color: gold;
}
</style>
