
<template>
    <transition name="modal-fade">
      <div v-if="isVisible" class="modal-overlay" @click.self="fecharModal">
        <div class="modal-content" v-if="isVisible"> <!-- Certifique-se de que o modal é renderizado apenas se for visível -->
          <div class="modal-header">
            <h3>{{ prestadorSelecionado.name }}</h3>
            <button class="close-btn" @click="fecharModal">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>Especialidade:</strong> {{ prestadorSelecionado.especialidade }}</p>
            <p><strong>Email:</strong> {{ prestadorSelecionado.email }}</p>
            <p><strong>Telefone:</strong> {{ prestadorSelecionado.telefone }}</p>
            <p><strong>Endereço:</strong> {{ prestadorSelecionado.endereco }}, {{ prestadorSelecionado.bairro }}, {{ prestadorSelecionado.cidade }} - {{ prestadorSelecionado.estado }}</p>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      prestadorSelecionado: Object,
    },
    methods: {
      fecharModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #ffffff;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }
  
  /* Estilos do cabeçalho do modal */
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #1565c0;
    color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  
  /* Botão de fechar */
  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  /* Estilos do corpo do modal */
  .modal-body {
    padding: 1.5rem;
    font-size: 1rem;
    color: #424242;
    line-height: 1.6;
  }
  
  /* Transições para animação do modal */
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .modal-fade-enter-from, .modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
  .modal-fade-enter-to, .modal-fade-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  
  @media (max-width: 768px) {
    .modal-content {
      width: 95%;
      max-width: 90%;
    }
  }
  </style>
  
