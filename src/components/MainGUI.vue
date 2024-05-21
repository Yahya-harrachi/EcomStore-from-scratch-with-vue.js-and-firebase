<template>
  <div class="container-fluid my-5">
    <div class="row align-items-center">
      <!-- Left Side Content -->
      <div class="col-lg-8 order-lg-1 order-2">
        <div class="text-center text-lg-left">
          <h1 class="display-4 mb-4">Welcome to Our Ecommerce Store</h1>
          <p class="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Pellentesque non justo sed turpis lacinia bibendum. Cras
            fringilla massa sit amet nulla dictum, nec cursus elit tempor.
            Integer auctor felis a nisl hendrerit volutpat. Nulla aliquet sapien
            ac nibh vestibulum, id aliquet velit faucibus.
          </p>
          <div class="mt-3">
            <button class="btn btn-outline-secondary">Products</button>
            <button class="btn btn-warning mr-2">Explore</button>
          </div>
        </div>
      </div>
      <!-- Right Side Image -->
      <div class="col-lg-4 order-lg-2 order-1 d-flex justify-content-center">
        <div>
          <img
            :src="require('../assets/Graphics/MainGUI.jpg')"
            alt="Image"
            class="img-fluid rounded"
            style="max-width: 140%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainGUI",
};
</script>

<style scoped lang="scss">
.container-fluid {
  padding-top: 0; /* Adjust based on your navbar height */
  padding-right: 320px;
}

@media (min-width: 992px) {
  .col-lg-8 {
    padding-right: 15px; /* Adjust for proper spacing between columns */
  }

  .col-lg-4 {
    padding-left: 15px; /* Adjust for proper spacing between columns */
  }
}

h1.display-4 {
  font-size: 2.5rem;
}

p.lead {
  font-size: 1.25rem;
  color: gray;
  padding-left: 150px;
  padding-right: 120px;
}

.btn {
  font-size: 1rem;
  padding: 0.5rem 2rem;
  margin: 0 1rem;
}

img.img-fluid {
  max-width: 100%; /* Adjust image width */
  height: auto;
  border-radius: 5px;
  margin-top: 20px; /* Adjust margin to your preference */
}
</style>
