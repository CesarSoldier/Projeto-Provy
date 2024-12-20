<template>
  <section class="fundo">
    <div class="cadastro-container">
      <!-- Left Section (Decorativa) -->
      <div class="left-section">
        <div class="logo-container">
          <img src="../assets/icon-provy.png" alt="Logo" width="100%" />
        </div>
      </div>
      <!-- Right Section (Formulário) -->
      <div class="right-section">
        <h2>Cadastrar-se</h2>
        <form @submit.prevent="handleCadastro">
          <div class="input-group">
            <label for="nome">Nome:</label>
            <input type="text" v-model="name" placeholder="Seu Nome" required />
          </div>

          <div class="input-group">
            <label for="email">Email:</label>
            <input type="email" v-model="email" placeholder="exemplo@gmail.com" required />
          </div>

          <div class="input-group">
            <label for="cpf">CPF:</label>
            <input type="text" ref="cpf" v-model="cpf" placeholder="Seu CPF" required />
          </div>

          <div class="input-group">
            <label for="telefone">Telefone:</label>
            <input type="text" ref="telefone" v-model="telefone" placeholder="(DDD) 9 0000-0000" required />
          </div>

          <div class="input-group">
            <label for="senha">Senha:</label>
            <input type="password" v-model="password" placeholder="********" required />
          </div>
          
          <button type="submit" class="btn">Criar Conta</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
        <p>Já possui uma conta? <router-link to="/login">Faça login</router-link></p>
      </div>
    </div>
  </section>
</template>

<script>
import Inputmask from 'inputmask';
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      cpf: '',
      telefone: '',
      password: '',
      errorMessage: '',
    };
  },
  mounted() {
    // Aplicar o Inputmask aos campos de CPF e Telefone
    const cpfMask = new Inputmask('999.999.999-99');
    cpfMask.mask(this.$refs.cpf);

    const phoneMask = new Inputmask('(55) (99) 9 9999-9999');
    phoneMask.mask(this.$refs.telefone);
  },
  methods: {
    async handleCadastro() {
      this.errorMessage = '';
      let backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
      if (!backendUrl) {
        backendUrl = process.env.VITE_APP_BACKEND_URL;
      }
      
      try {
        const response = await axios.post(`${backendUrl}/register`, {
          name: this.name,
          email: this.email,
          cpf: this.cpf,
          telefone: this.telefone,
          password: this.password,
        });

        console.log('Usuário cadastrado:', response.data);
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Erro ao cadastrar usuário';
        console.error('Erro ao cadastrar usuário:', this.errorMessage);
      }
    },
  },
};
</script>

<style scoped>
.fundo {
  font-family: 'Mulish', sans-serif;
  display: block;
  padding-top: 50px;
  
  box-sizing: border-box;
  
  background-color: #ddddddf3;

  width: 100vw;
  min-height: 100vh;
  color: #ffffff;
  overflow: hidden;

  /* Adicionando a animação de movimento */
  animation: moveSideToSide 9s ease-in-out infinite;
}

.cadastro-container {
  display: flex;
  width: 90vw; /* Reduz a largura total da tela */
  height: 80vh; /* Reduz a altura total da tela */
  max-width: 900px; /* Limita o tamanho máximo da tela */
  margin: 0 auto;
}

.left-section {
  flex: 1;
  background: linear-gradient(135deg, #064f68, #084c83);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.logo-container {
  width: 150px;
  height: 150px;
  padding: 1rem;
  background-color: transparent;
  transition: transform 0.4s ease, filter 0.4s ease;
}

.logo-container:hover {
  animation: rotateZoom 1s ease forwards;
  filter: brightness(1.5) drop-shadow(0 0 15px rgba(255, 255, 255, 0.5));
}

@keyframes rotateZoom {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

.right-section {
  flex: 1;
  background-color: #ffffff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #333;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
}

.right-section h2 {
  color: #2980b9;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 0.75rem;
}

.input-group label {
  font-weight: bold;
  color: #2980b9;
  font-size: 0.9rem;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.btn {
  background-color: #2980b9;
  color: #fff;
  padding: 0.6rem;
  width: 100%;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.75rem;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #2c3e50;
}

.error-message {
  color: #e74c3c;
}
</style>
