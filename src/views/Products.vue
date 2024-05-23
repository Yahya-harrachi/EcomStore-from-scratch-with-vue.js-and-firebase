<template>
  <div class="ProductsVue">
    <div class="container">
      <!-- Introduction Section -->
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Products Page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde,
              ducimus.
            </p>
          </div>
          <div class="col-md-6">
            <img src="" alt="Intro Image" class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <!-- Products List Section -->
      <div class="product-test">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3>Products List</h3>
          <button class="btn btn-primary" @click="addNew()">Add Product</button>
        </div>

        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.description }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="editProduct(product)">
                    Edit
                  </button>
                  <button class="btn btn-danger btn-sm" style="margin-left: 0.5rem" @click="deleteProduct(product.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <div id="product" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="editLabel" class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="productName" class="form-label text-left">Product Name</label>
              <input id="productName" v-model="product.name" type="text" placeholder="Product Name" class="form-control"
                style="font-size: 0.9rem" />
            </div>
            <div class="form-group">
              <label for="productDescription" class="form-label text-left">Product Description</label>
              <vueEditor v-model="product.description"></vueEditor>
              <textarea id="productDescription" v-model="product.description" placeholder="Product Description"
                class="form-control" rows="3" style="font-size: 0.9rem"></textarea>
            </div>
            <div class="form-group">
              <label for="productPrice" class="form-label text-left">Product Price</label>
              <input id="productPrice" v-model="product.price" type="number" placeholder="Product Price"
                class="form-control" style="font-size: 0.9rem" />
            </div>
            <div class="form-group">
              <label for="productTags" class="form-label text-left">Product Tags</label>
              <div class="d-flex flex-wrap align-items-center">
                <!-- Display tags -->
                <div v-for="(tag, index) in product.tags" :key="index" class="tag">
                  <span style="
                      font-weight: bold;
                      text-transform: uppercase;
                      margin-left: 0.6rem;
                    ">{{ tag }}</span>
                  <button class="btn btn-sm
                    btn-danger" style="margin-left: 0.6rem" @click="deleteTag(index)">
                    &times;
                  </button>
                </div>
                <!-- Tag input field -->
                <input id="productTags" v-model="tag" type="text" placeholder="Product Tags (comma-separated)"
                  class="form-control" style="font-size: 0.9rem; width: 100%; margin-top: 0.5rem"
                  @keyup.enter="addTag" />
              </div>
            </div>
            <div class="form-group">
              <label for="productImages" class="form-label text-left">Product Images</label>
              <input id="productImages" type="file" class="form-control" multiple @change="uploadImage" />
              <div class="image-grid">
                <div v-for="(image, index) in product.images" :key="index" class="image-container">
                  <img :src="image" :alt="product.name" class="product-image" />
                  <button class="btn btn-sm btn-danger delete-image-btn" @click="deleteImage(product.images[index], index)">
                    &times;
                  </button>
                </div>
                <!-- Loading overlay -->
                <div v-if="isLoading" class="loading-overlay">
                  <div class="spinner"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button v-if="modal === 'new'" type="button" class="btn btn-primary" @click="addProduct">
              Add Product
            </button>
            <button v-if="modal === 'edit'" type="button" class="btn btn-primary" @click="updateProduct">
              Apply changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase"; // Ensure the correct imports
import * as bootstrap from "bootstrap";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import Swal from "sweetalert2";

export default {
  name: "ProductsVue",

  data() {
    return {
      products: [],
      product: {
        name: "",
        description: "",
        price: "",
        tags: [],
        images: [],
      },
      activeItem: null,
      modalTitle: "",
      modal: null,
      tag: "",
      isLoading: false, // Add this line
    };
  },

  async created() {
    await this.readData();
  },

  methods: {
    async uploadImage(e) {
      if (e.target.files[0]) {
        this.isLoading = true; // Set loading state to true
        let file = e.target.files[0];
        const storageRef = ref(storage, 'products/' + Math.random() + '_' + file.name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
          (snapshot) => {
            // Handle progress, if needed
          },
          (error) => {
            console.error("Error uploading image: ", error);
            this.isLoading = false; // Set loading state to false in case of error
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              this.product.images.push(downloadURL);
              this.isLoading = false; // Set loading state to false after upload is complete
            });
          }
        );
      }
    },
    addTag() {
      if (!Array.isArray(this.product.tags)) {
        this.product.tags = []; // Ensure that product.tags is initialized as an array
      }
      if (this.tag.trim() !== "") {
        this.product.tags.push(this.tag.trim());
        this.tag = ""; // Clear the tag input field after adding the tag
      }
    },
    modalAction() {
      const myModalEl = document.getElementById("product");
      const myModal =
        bootstrap.Modal.getInstance(myModalEl) ||
        new bootstrap.Modal(myModalEl);
      return myModal;
    },
    async deleteImage(img, index) {
      try {
        const imageRef = ref(storage, img);
        await deleteObject(imageRef);
        this.product.images.splice(index, 1);
        console.log('Image deleted successfully');
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
    ,
    async readData() {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        this.products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error reading data:", error);
      }
    },
    addNew() {
      this.modal = "new";
      this.modalTitle = "Add New Product ";
      this.resetProductForm();
      this.modalAction().show();
    },
    async updateProduct() {
      try {
        const productRef = doc(db, "products", this.product.id);

        await updateDoc(productRef, {
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          tags: this.product.tags,
          images: this.product.images,
        });

        console.log("Product updated with ID: ", this.product.id);

        await this.readData();
        Swal.fire({
          icon: "success",
          title: "Updated successfully",
        });

        this.modalAction().hide();
      } catch (e) {
        console.error("Error updating product: ", e);
      }
    },

    editProduct(product) {
      this.product = { ...product };
      this.modal = "edit";
      this.modalTitle = "Update the Product ";
      this.modalAction().show();
    },

    async deleteProduct(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteDoc(doc(db, "products", id));
            this.readData();
            Swal.fire({
              icon: "success",
              title: "Deleted successfully",
            });
          } catch (error) {
            console.error("Error deleting product: ", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        }
      });
    },

    async addProduct() {
      try {
        const docRef = await addDoc(collection(db, "products"), {
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          tags: this.product.tags,
          images: this.product.images,
        });
        console.log("Product added with ID: ", docRef.id);
        this.readData();
        Swal.fire({
          icon: "success",
          title: "Product created successfully",
        });
        this.modalAction().hide();
      } catch (e) {
        console.error("Error adding product: ", e);
      }
    },

    resetProductForm() {
      this.product = {
        name: "",
        description: "",
        price: "",
        tags: [],
        images: [],
      };
    },
  },
};
</script>
<style scoped>
.ProductsVue {
  padding: 20px;
}

.intro {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.product-test {
  margin-top: 20px;
}

.table-responsive {
  margin-top: 20px;
}

.table thead {
  background-color: #f1f1f1;
}

.table-hover tbody tr:hover {
  background-color: #f9f9f9;
}

.modal-header {
  background-color: #007bff;
  color: white;
}

.modal-footer .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.modal-footer .btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  text-align: left;
  margin-top: 1.5rem;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  position: relative;
  /* Added */
}

.image-container {
  position: relative;
  width: 100px;
  height: 100px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.delete-image-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 8px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #007bff;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
