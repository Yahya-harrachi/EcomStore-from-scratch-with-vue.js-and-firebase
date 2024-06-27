<template>
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(image, index) in images"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <img :src="image.src" class="d-block w-100" :alt="image.alt">

        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageSlider',
    props: {
      images: {
        type: Array,
        required: true,
        default: () => []
      }
    }
  };
  </script>
  
  <style scoped>
  .carousel {
    margin-top: 20px;
  }
  
  .carousel-item img {
    height: 500px;
    object-fit: cover;
  }
  
  .carousel-caption {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  