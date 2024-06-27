<template>
  <div>
    <NavBar></NavBar>
    <MainGUI></MainGUI>
    <ImageSlider :images="sliderImages" />
    <ProductsSection></ProductsSection>
    <FAQSection></FAQSection>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"; // Import NavBar component
import Footer from "@/components/Footer.vue";
import ImageSlider from "@/components/ImageSlider.vue";
import FAQSection from "@/components/FAQSection.vue";
export default {
  name: "HomeView",
  components: {
    NavBar, // Register NavBar component
    Footer,
    ImageSlider,
    FAQSection
  },
  data() {
    return {
      sliderImages: [
        {
          src: require('../assets/Graphics/1.jpg'),
          alt: 'Image 1',
          
        },
        {
          src: require('../assets/Graphics/2.svg'),
          alt: 'Image 2',
          
        },
        {
          src: require('../assets/Graphics/1.svg'),
          alt: 'Image 3',
         
        }
      ]
    };
  },
  mounted() {
    document.title = "EcomStore"; // Set your desired title here
  },
};
</script>
