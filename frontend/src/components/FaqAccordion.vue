<template>
    <div class="faq-container">
      <h2 class="faq-title">Perguntas Frequentes</h2>
      <div 
        v-for="(faq, index) in faqs" 
        :key="index" 
        class="faq-item"
      >
        <div 
          class="faq-question" 
          @click="toggleAnswer(index)"
        >
          <span>{{ faq.question }}</span>
          <span class="toggle-icon">
            {{ openIndex === index ? '-' : '+' }}
          </span>
        </div>
        <transition name="fade">
          <div 
            v-if="openIndex === index" 
            class="faq-answer"
          >
            {{ faq.answer }}
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FaqAccordion",
    data() {
      return {
        openIndex: null, 
        faqs: [
          {
            question: "Como posso me cadastrar no Provy?",
            answer: "Você pode se cadastrar clicando no botão 'Cadastrar' no canto superior direito do site."
          },
          {
            question: "O Provy é gratuito?",
            answer: "Sim, o Provy é gratuito para clientes. Os prestadores de serviço têm uma taxa de adesão simbólica."
          },
          {
            question: "Como entro em contato com o suporte?",
            answer: "Você pode entrar em contato com o suporte através da página de 'Ajuda' no menu superior."
          },
        ]
      };
    },
    methods: {
      toggleAnswer(index) {
        this.openIndex = this.openIndex === index ? null : index;
      }
    }
  };
  </script>
  
  <style scoped>
  .faq-container {
    background-color: #ffffff;
    padding: 40px 20px;
    margin: 40px auto;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
  }
  
  .faq-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .faq-item {
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  
  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    color: #0071bc;
    font-size: 1.2rem;
    padding: 10px 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .faq-question:hover {
    background-color: #0071bc;
    color: white;
  }
  
  .faq-answer {
    margin-top: 10px;
    color: #555;
    font-size: 1rem;
    text-align: left;
    padding: 10px 15px;
    background-color: #f2f2f2;
    border-radius: 8px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Animação para transição */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .toggle-icon {
    font-size: 1.5rem;
    font-weight: bold;
    color: #0071bc;
    transition: transform 0.3s ease;
  }
  
  .faq-question[aria-expanded="true"] .toggle-icon {
    transform: rotate(180deg);
  }
  </style>
  