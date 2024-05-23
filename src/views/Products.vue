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
                  <button
                    class="btn btn-warning btn-sm"
                    @click="editProduct(product)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    style="margin-left: 0.5rem"
                    @click="deleteProduct(product.id)"
                  >
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
    <div
      id="product"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="editLabel" class="modal-title">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="productName" class="form-label text-left"
                >Product Name</label
              >
              <input
                id="productName"
                v-model="product.name"
                type="text"
                placeholder="Product Name"
                class="form-control"
                style="font-size: 0.9rem"
              />
            </div>
            <div class="form-group">
              <label for="productDescription" class="form-label text-left"
                >Product Description</label
              >
              <vueEditor v-model="product.description"></vueEditor>
              <textarea
                id="productDescription"
                v-model="product.description"
                placeholder="Product Description"
                class="form-control"
                rows="3"
                style="font-size: 0.9rem"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="productPrice" class="form-label text-left"
                >Product Price</label
              >
              <input
                id="productPrice"
                v-model="product.price"
                type="number"
                placeholder="Product Price"
                class="form-control"
                style="font-size: 0.9rem"
              />
            </div>
            <div class="form-group">
              <label for="productTags" class="form-label text-left"
                >Product Tags</label
              >
              <div class="d-flex flex-wrap align-items-center">
                <!-- Display tags -->
                <div
                  v-for="(tag, index) in product.tags"
                  :key="index"
                  class="tag"
                >
                  <span
                    style="
                      font-weight: bold;
                      text-transform: uppercase;
                      margin-left: 0.6rem;
                    "
                    >{{ tag }}</span
                  >
                  <button
                    class="btn btn-sm btn-danger"
                    style="margin-left: 0.6rem"
                    @click="deleteTag(index)"
                  >
                    &times;
                  </button>
                </div>
                <!-- Tag input field -->
                <input
                  id="productTags"
                  v-model="tag"
                  type="text"
                  placeholder="Product Tags (comma-separated)"
                  class="form-control"
                  style="font-size: 0.9rem; width: 100%; margin-top: 0.5rem"
                  @keyup.enter="addTag"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="productImages" class="form-label text-left"
                >Product Images</label
              >
              <input
                id="productImages"
                type="file"
                class="form-control"
                multiple
                @change="handleImageUpload"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              v-if="modal === 'new'"
              type="button"
              class="btn btn-primary"
              @click="addProduct"
            >
              Add Product
            </button>
            <button
              v-if="modal === 'edit'"
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              Apply changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
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
    };
  },

  async created() {
    await this.readData();
  },

  methods: {
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
    deleteTag(index) {
      this.product.tags.splice(index, 1);
    },
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
        // Reference to the specific document to be updated
        const productRef = doc(db, "products", this.product.id);

        // Update the document with the new data
        await updateDoc(productRef, {
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          tags: this.product.tags,
          images: this.product.images,
        });

        console.log("Product updated with ID: ", this.product.id);

        // Fetch the updated list of products
        await this.readData();
        Swal.fire({
          icon: "success",
          title: "Updated successfully",
        });
        // Hide the modal
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
</style>
