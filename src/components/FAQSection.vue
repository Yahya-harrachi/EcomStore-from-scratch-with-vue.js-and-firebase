<template>
    <div id="FAQSection" class="faq-section">
      <div class="container py-5">
        <h2 class="text-center mb-5 section-title">Frequently Asked Questions</h2>
        <div class="accordion" id="faqAccordion">
          <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
            <h2 class="accordion-header" :id="'heading' + index">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="false" :aria-controls="'collapse' + index">
                <span>{{ faq.question }}</span>
                
              </button>
            </h2>
            <div :id="'collapse' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' + index" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FAQSection",
    data() {
      return {
        faqs: [
          {
            question: "What is ScaleClick Store?",
            answer: "ScaleClick Store is an online marketplace offering a wide range of products with fast shipping, secure payments, and 24/7 customer support."
          },
          {
            question: "How can I place an order?",
            answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the instructions to complete your purchase securely."
          },
          {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods, including credit/debit cards, PayPal, and other secure online payment options. You can choose your preferred payment method during checkout."
          },
          {
            question: "Do you offer international shipping?",
            answer: "Yes, we offer international shipping to many countries worldwide. Shipping costs and delivery times may vary depending on your location. Please refer to our Shipping Policy for more information."
          },
          {
            question: "How can I track my order?",
            answer: "Once your order has been shipped, you will receive a tracking number via email. You can use this tracking number to track your order's status and estimated delivery date on our website or the courier's website."
          },
          // Add more FAQs here...
        ]
      };
    }
  };
  </script>
  
  <style scoped lang="scss">
  .faq-section {
    background-color: #f9f9f9;
    padding-top: 100px;
    margin-bottom: 10rem;
  }
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #333;
  }
  
  .accordion-button {
    background-color: #fff;
    color: #333;
    border: none;
    border-bottom: 1px solid #ddd;
    border-radius: 0;
    padding: 1rem 2rem;
    position: relative;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .accordion-button:hover {
    background-color: #f5f5f5;
  }
  
  .accordion-button span {
    flex-grow: 1;
  }
  
  .accordion-button i {
    font-size: 1.2rem;
    transition: transform 0.3s;
  }
  
  .accordion-button[aria-expanded="true"] i {
    transform: rotate(180deg);
  }
  
  .accordion-body {
    background-color: #fff;
    color: #555;
    padding: 1.5rem 2rem;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }

  .section-title {
  background-color: #673ab7;
  color: white;
  padding: 1rem;
  border-radius: 5px;
}
  </style>
  