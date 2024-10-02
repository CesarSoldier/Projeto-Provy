<template>
  <div class="cadastro-container">
    <h2>Cadastro de Prestador de Serviços</h2>
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
      <div class="input-group">
        <label for="especialidade">Informe sua especialidade:</label>
        <input type="especialidade" v-model="especialidade" placeholder ="Ex: Pedreiro, Eletricista, Marceneiro... required"/>
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
      errorMessage: '', 
    };
  },
  methods: {
    async handleCadastro() {
      try {
        this.errorMessage = ''; 
        const response = await axios.post('http://13.61.25.37:3000/registerprovedors', {
          name: this.name,
          email: this.email,
          cpf: this.cpf,
          password: this.password,
          especialidade: this.especialidade,
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
  justify-content: space-evenly;
  padding: 8px;
  margin-bottom: 1.5rem;
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

.btn {
  background-color: white; 
  color: blue; 
  border: 2px solid blue; 
  border-radius: 5px; 
  padding: 10px 20px; 
  font-size: 1rem; 
  font-weight: bold; 
  cursor: pointer; 
  transition: background-color 0.3s ease, box-shadow 0.3s ease; 
}

.btn:hover {
  background-color: #2980b9; 
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

</style>
