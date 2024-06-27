<template>
    <div class="cancel-page">
      <h1>Payment Canceled</h1>
      <p>Your transaction was canceled. You can try again later.</p>
      <router-link to="/">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Cancel',
  };
  </script>
  
  <style scoped>
  .cancel-page {
    text-align: center;
    padding: 50px;
  }
  </style>
  