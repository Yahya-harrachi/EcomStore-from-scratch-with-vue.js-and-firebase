<template>
  <div>
    <NavBar></NavBar>
    <MainGUI></MainGUI>
    <ProductsSection></ProductsSection>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"; // Import NavBar component

export default {
  name: "HomeView",
  components: {
    NavBar, // Register NavBar component
  },
  mounted() {
    document.title = "EcomStore"; // Set your desired title here
  },
};
</script>
