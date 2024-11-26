<template>
  <transition name="modal-fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="fecharModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ prestadorSelecionado.name }}</h3>
          <button class="close-btn" @click="fecharModal">&times;</button>
        </div>
        <div class="modal-body">
          <p><strong>Especialidade:</strong> {{ prestadorSelecionado.especialidade }}</p>
          <p><strong>Email:</strong> {{ prestadorSelecionado.email }}</p>
          <p><strong>Telefone:</strong> {{ prestadorSelecionado.telefone }}</p>
          <p><strong>Endereço:</strong> {{ prestadorSelecionado.endereco }}, {{ prestadorSelecionado.bairro }}, {{ prestadorSelecionado.cidade }} - {{ prestadorSelecionado.estado }}</p>
          
          <!-- Botão WhatsApp -->
          <a
            :href="'https://api.whatsapp.com/send?phone=' + formatarNumeroWhatsApp(prestadorSelecionado.telefone)"
            target="_blank"
            class="btn-whatsapp"
          >
            Iniciar conversa no WhatsApp
          </a>
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
    },
    // Função para formatar o número de telefone, removendo espaços, parênteses e traços
    formatarNumeroWhatsApp(telefone) {
      return telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    },
  },
};
</script>

<style scoped>
/* Overlay com desfoque */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); /* Fundo semi-transparente */
  backdrop-filter: blur(8px); /* Efeito de desfoque no fundo */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Garantir que o modal fique acima de outros elementos */
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
}

/* Modal */
.modal-content {
  background: #ffffff;
  border-radius: 12px;
  width: 95%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000; /* Mantém o modal acima da sobreposição */
}

/* Cabeçalho do modal */
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
.modal-header h3 {
color: #ffffff;
}

/* Botão de fechar */
.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Corpo do modal */
.modal-body {
  padding: 1.5rem;
  font-size: 1rem;
  color: #424242;
  line-height: 1.6;
}

/* Transição do modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-in-out;
}

.modal-fade-enter-from {
  transform: translateY(-50px) scale(0.9);
  opacity: 0;
}

.modal-fade-enter-to {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.modal-fade-leave-from {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.modal-fade-leave-to {
  transform: translateY(-50px) scale(0.9);
  opacity: 0;
}

.btn-whatsapp {
  background-color: #25d366;
  color: white;
  padding: 12px 20px;
  border-radius: 50px;
  text-align: center;
  font-size: 1.1rem;
  display: inline-block;
  margin-top: 15px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-whatsapp:hover {
  background-color: #128c7e;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-width: 90%;
  }
}
</style>