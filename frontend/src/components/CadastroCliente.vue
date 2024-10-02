<template>
  <div class="cadastro-container">
    <h2>Cadastro de Cliente</h2>
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
        <label for="cpf">CPF: </label>
        <input type="text" v-model="cpf" placeholder="Seu CPF" required />
      </div>
      <div class="input-group">
        <label for="senha">Senha:</label>
        <input type="password" v-model="password" placeholder="********" required />
      </div>
      <button type="submit" class="btn">Cadastrar</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
    <p>Já possui uma conta? <router-link to="/login">Faça login</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      cpf: '',
      password: '',
      errorMessage: '', // Adicione uma variável para mensagens de erro
    };
  },
  methods: {
    async handleCadastro() {
      try {
        this.errorMessage = ''; // Limpa mensagens de erro anteriores
        const response = await axios.post('http://localhost:3000/register', {
          name: this.name,
          email: this.email,
          cpf: this.cpf,
          password: this.password,
        });
        console.log('Usuário cadastrado:', response.data);

        // Redireciona para a página de login
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
.input-group{
  display: flex;
  justify-content: space-around;
  gap: 16px;
  padding: 8px;
}
.cadastro-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.cadastro-container h2 {
  margin-bottom: 1rem;
  color: blue;
}

.input-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

</style>