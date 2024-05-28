<template>
  <div>
    <!-- Include the NavBar component -->
    <NavBar />

    <!-- About Section -->
    <div id="AboutSection" class="about">
      <!-- Hero Section -->
      <div class="hero-section text-center text-white">
        <div class="container">
          <h1 class="display-4">About Us</h1>
          <p class="lead">Learn more about our company, mission, and team.</p>
        </div>
      </div>

      <!-- Company Information Section -->
      <div class="company-info-section py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 mb-4 mb-md-0">
              <h2>Our Company</h2>
              <p>We are dedicated to providing the best service and products to our customers. Our company has been at the forefront of innovation and quality for over a decade.</p>
              <p>We believe in the power of teamwork, integrity, and excellence. Our commitment to these values drives everything we do.</p>
            </div>
            <div class="col-md-6">
              <div class="info-box p-4 shadow-sm">
                <h3><i class="fas fa-check-circle"></i> Why Choose Us?</h3>
                <ul class="list-unstyled mt-3">
                  <li><i class="fas fa-award"></i> High-Quality Products</li>
                  <li><i class="fas fa-headset"></i> Exceptional Customer Service</li>
                  <li><i class="fas fa-lightbulb"></i> Innovative Solutions</li>
                  <li><i class="fas fa-star"></i> Commitment to Excellence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mission Statement Section -->
      <div class="mission-statement-section bg-light py-5">
        <div class="container text-center">
          <h2>Our Mission</h2>
          <p class="lead">To empower our customers and help them achieve their goals by providing high-quality products and exceptional service.</p>
        </div>
      </div>

      <!-- Vision Section -->
      <div class="vision-section py-5">
        <div class="container text-center">
          <h2>Our Vision</h2>
          <p class="lead">To be a global leader in our industry, recognized for our innovative solutions and exceptional customer experiences.</p>
        </div>
      </div>

      <!-- Values Section -->
      <div class="values-section bg-light py-5">
        <div class="container text-center">
          <h2>Our Values</h2>
          <div class="row">
            <div class="col-md-4">
              <div class="value-box p-4 shadow-sm">
                <h3><i class="fas fa-shield-alt"></i> Integrity</h3>
                <p>We act with honesty and integrity, not compromising the truth.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="value-box p-4 shadow-sm">
                <h3><i class="fas fa-trophy"></i> Excellence</h3>
                <p>We strive for excellence in everything we do, aiming to exceed expectations.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="value-box p-4 shadow-sm">
                <h3><i class="fas fa-lightbulb"></i> Innovation</h3>
                <p>We embrace innovation and continuously seek new and better ways to serve our customers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="team-section py-5">
        <div class="container">
          <h2 class="text-center mb-5">Meet Our Team</h2>
          <div class="row">
            <div class="col-md-4" v-for="(member, index) in teamMembers" :key="index">
              <div class="team-member text-center p-4 shadow-sm">
                <img :src="member.image" class="rounded-circle mb-3" alt="Team Member Image">
                <div class="member-info">
                  <h5 class="member-name">{{ member.name }}</h5>
                  <p class="member-position">{{ member.position }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="contact-section bg-light py-5">
        <div class="container text-center">
          <h2>Contact Us</h2>
          <p class="lead">Have questions? We’re here to help. Reach out to us anytime, and we’ll happily answer your questions.</p>
          <a href="#" class="btn btn-primary btn-lg mt-3">Get in Touch</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue'; // Adjust the path as necessary

export default {
  name: "AboutSection",
  components: {
    NavBar
  },
  setup() {
    const teamMembers = ref([
      {
        name: 'John Doe',
        position: 'CEO',
        image: 'https://via.placeholder.com/300x300'
      },
      {
        name: 'Jane Smith',
        position: 'CTO',
        image: 'https://via.placeholder.com/300x300'
      },
      {
        name: 'Mike Johnson',
        position: 'CFO',
        image: 'https://via.placeholder.com/300x300'
      }
      // Add more team members as needed
    ]);

    return { teamMembers };
  }
};
</script>

<style scoped lang="scss">
.about {
  .hero-section {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: #ffffff;
    padding: 7rem 0;
    h1 {
      font-size: 3.5rem;
      font-weight: 700;
    }
    p {
      font-size: 1.5rem;
      font-weight: 300;
    }
  }

  .company-info-section {
    background: #ffffff;
    padding: 3rem 0;
    h2 {
      margin-bottom: 1.5rem;
      font-size: 2.5rem;
      font-weight: 700;
    }
    p {
      line-height: 1.8;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    .info-box {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 0.5rem;
      h3 {
        margin-bottom: 1rem;
        font-size: 1.75rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        i {
          margin-right: 0.5rem;
        }
      }
      ul {
        list-style-type: none;
        padding: 0;
        li {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          i {
            margin-right: 0.5rem;
            color: #6a11cb;
          }
        }
      }
    }
  }

  .mission-statement-section, .vision-section, .values-section, .contact-section {
    padding: 3rem 0;
    h2 {
      margin-bottom: 1.5rem;
      font-size: 2.5rem;
      font-weight: 700;
    }
    p {
      line-height: 1.8;
      font-size: 1.2rem;
      font-weight: 300;
    }
    .value-box {
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      h3 {
        font-size: 1.75rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        i {
          margin-right: 0.5rem;
          color: #6a11cb;
        }
      }
      p {
        font-size: 1.1rem;
        line-height: 1.8;
      }
    }
  }

  .team-section {
    background: #ffffff;
    padding: 3rem 0;
    h2 {
      margin-bottom: 3rem;
      font-size: 2.5rem;
      font-weight: 700;
    }
    .team-member {
      margin-bottom: 2rem;
      padding: 2rem;
      background: #f8f9fa;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      img {
        max-width: 100%;
        height: auto;
        border-radius: 50%;
      }
      .member-info {
        margin-top: 1.5rem;
        h5 {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
        }
        p {
          margin-bottom: 0;
          font-size: 1.1rem;
          font-weight: 300;
        }
      }
    }
  }

  .contact-section {
    padding: 3rem 0;
    h2 {
      margin-bottom: 1.5rem;
      font-size: 2.5rem;
      font-weight: 700;
    }
    p {
      line-height: 1.8;
      font-size: 1.2rem;
      font-weight: 300;
    }
    .btn {
      font-size: 1.2rem;
      padding: 0.75rem 1.5rem;
    }
  }
}
</style>
