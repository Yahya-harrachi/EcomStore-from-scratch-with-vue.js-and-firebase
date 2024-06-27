<template>
  <div class="overview-page">
    <h1><i class="fas fa-chart-line"></i> Overview</h1>
    <div class="summary">
      <!-- Summary Cards -->
      <div class="summary-card">
        <h2 class="summary-title"><i class="fas fa-box"></i> Total Products</h2>
        <p>{{ totalProducts }}</p>
      </div>
      <div class="summary-card">
        <h2 class="summary-title"><i class="fas fa-shopping-bag"></i> Total Orders</h2>
        <p>{{ totalOrders }}</p>
      </div>
      <div class="summary-card">
        <h2 class="summary-title"><i class="fas fa-dollar-sign"></i> Total Revenue</h2>
        <p>{{ totalRevenue }}</p>
      </div>
      <div class="summary-card">
        <h2 class="summary-title"><i class="fas fa-users"></i> Total Customers</h2>
        <p>{{ totalCustomers }}</p>
      </div>
    </div><h2 class="chart-title">Sales Per Day</h2>
    <div class="chart-container">
      <!-- Charts or Graphs -->
      <!-- Insert your charts/graphs components here -->
      
      <img src="@/assets/Graphics/OverViewChart.png" alt="Chart Image" class="chart-image" />
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
      totalRevenue: 0,
      totalCustomers: 0
    };
  },
  mounted() {
    // Fetch data for totalProducts, totalOrders, totalRevenue, and totalCustomers
    // You can fetch data from an API or any other source here
    // Assign fetched data to respective variables
    this.totalProducts = 100; // Example data
    this.totalOrders = 500; // Example data
    this.totalRevenue = 10000; // Example data
    this.totalCustomers = 200; // Example data
  }
};
</script>

<style scoped>
.overview-page {
  padding: 20px;
}

h1 {
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

h1 i {
  margin-right: 10px;
}

.summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
}

.summary-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  flex: 1 0 calc(50% - 10px); /* Adjusted to create a margin between cards */
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.summary-card .summary-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.chart-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.chart-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.chart-image {
  max-width: 80%; /* Adjusted size */
  border: 2px solid #ddd; /* Added border */
  border-radius: 8px;
}
</style>
