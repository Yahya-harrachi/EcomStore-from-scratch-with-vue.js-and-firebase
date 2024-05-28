<template>
  <div class="overview-page">
    <h1>Overview</h1>
    <div class="summary">
      <!-- Summary Cards -->
      <div class="summary-card">
        <h2>Total Products</h2>
        <p>{{ totalProducts }}</p>
      </div>
      <div class="summary-card">
        <h2>Total Orders</h2>
        <p>{{ totalOrders }}</p>
      </div>
      <div class="summary-card">
        <h2>Total Revenue</h2>
        <p>{{ totalRevenue }}</p>
      </div>
    </div>
    <div class="charts">
      <!-- Charts or Graphs -->
      <!-- Insert your charts/graphs components here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewPage',
  data() {
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0
    };
  },
  mounted() {
    // Fetch data for totalProducts, totalOrders, and totalRevenue
    // You can fetch data from an API or any other source here
    // Assign fetched data to respective variables
    this.totalProducts = 100; // Example data
    this.totalOrders = 500; // Example data
    this.totalRevenue = 10000; // Example data
  }
};
</script>

<style scoped>
.overview-page {
  padding: 20px;
}

.summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.summary-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  margin-right: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.summary-card h2 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.charts {
  /* Add styling for charts/graphs container */
}
</style>
