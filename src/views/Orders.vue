<template>
  <div class="OrdersVue">
    <div class="container">
      <!-- Page Title -->
      <div class="page-title">
        <h1><i class="fas fa-boxes"></i> Orders Page</h1>
      </div>

      <!-- Introduction Section -->
      <div class="intro ">
        <div class="row h-100 ">
          <div class="col-md-">
            <p>
              Manage and review all orders placed on our platform. This page provides essential details about each order,
              including order IDs, dates, and statuses. Please handle user data with care to maintain privacy and security.
              For assistance, contact support.
            </p>
          </div>
          <div class="col-md-6">
          </div>
        </div>
      </div>

      <hr />

      <!-- Orders List Section -->
      <div class="order-test">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3>Orders List</h3>
        </div>

        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ formatTimestamp(order.date) }}</td>
                <td>{{ order.status }}</td>
                <td>
                  <button class="btn btn-success btn-sm mr-2" @click="viewOrderDetails(order)">
                    <i class="fas fa-eye"></i> View Details
                  </button>
                  <button class="btn btn-danger btn-sm" @click="deleteOrder(order.id)">
                    <i class="fas fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Order Modal -->
    <div id="order" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="editLabel" class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <p><strong>Order ID:</strong> {{ order.id }}</p>
                <p><strong>Date:</strong> {{ formatTimestamp(order.date) }}</p>
                <p><strong>Total Price:</strong> {{ order.totalPrice }}</p>
                <p><strong>Status:</strong> {{ order.status }}</p>
              </div>
              <div class="col-md-6">
                <p v-if="order.userInfo">
                  <strong>User Information:</strong>
                  <template v-if="order.userInfo.name">
                    <p>Name: {{ order.userInfo.name }}</p>
                  </template>
                  <template v-if="order.userInfo.email">
                    <p>Email: {{ order.userInfo.email }}</p>
                  </template>
                  <template v-if="order.userInfo.phone">
                    <p>Phone: {{ order.userInfo.phone }}</p>
                  </template>
                  <template v-if="order.userInfo.city">
                    <p>City: {{ order.userInfo.city }}</p>
                  </template>
                </p>
              </div>
            </div>
            <div v-if="order.products && order.products.length">
              <p><strong>Products:</strong></p>
              <div v-for="(product, index) in order.products" :key="index" class="mb-3">
                <p><strong>Product Name:</strong> {{ product.productName }}</p>
                <p>Price: ${{ product.productPrice }}</p>
                <p>Quantity: {{ product.productQuantity }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-success" @click="markOrderAsShipped()">
              <i class="fas fa-shipping-fast"></i> Shipped
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import * as bootstrap from "bootstrap";
import Swal from "sweetalert2";

export default {
  name: "OrdersVue",

  data() {
    return {
      orders: [],
      order: {},
      modalTitle: "",
      modal: null,
    };
  },

  async created() {
    await this.readData();
  },

  methods: {
    async readData() {
      try {
        const querySnapshot = await getDocs(collection(db, "Orders"));
        this.orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error reading data:", error);
      }
    },

    viewOrderDetails(order) {
      this.order = order;
      this.modalTitle = "Order Details";
      this.modalAction().show();
    },

    modalAction() {
      const myModalEl = document.getElementById("order");
      const myModal = bootstrap.Modal.getInstance(myModalEl) || new bootstrap.Modal(myModalEl);
      return myModal;
    },

    formatTimestamp(timestamp) {
      if (timestamp && timestamp.seconds) {
        return new Date(timestamp.seconds * 1000).toLocaleString();
      } else {
        return "Timestamp Not Available";
      }
    },

    async markOrderAsShipped() {
      try {
        await updateDoc(doc(db, "Orders", this.order.id), {
          status: "Shipped",
        });

        this.order.status = "Shipped";
        this.orders = this.orders.map((order) =>
          order.id === this.order.id ? { ...order, status: "Shipped" } : order
        );

        this.modalAction().hide();

        Swal.fire({
          icon: "success",
          title: "Order marked as shipped",
        });
      } catch (error) {
        console.error("Error marking order as shipped: ", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while marking the order as shipped!",
        });
      }
    },

    async deleteOrder(orderId) {
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
            await deleteDoc(doc(db, "Orders", orderId));
            this.orders = this.orders.filter((order) => order.id !== orderId);
            this.modalAction().hide();
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
  },
};
</script>

<style scoped>
.OrdersVue {
  padding: 20px;
}

.page-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.page-title h1 {
  display: flex;
  align-items: center;
  font-size: 2rem;
}

.page-title h1 i {
  margin-right: 10px;
  font-size: 1.5rem;
}

.intro {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  
}

.intro p {
  font-size: 1rem;
  line-height: 1.5;
}

.order-test {
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
</style>
