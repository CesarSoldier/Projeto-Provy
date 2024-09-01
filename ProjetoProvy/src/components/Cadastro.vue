<template>
    <div class="cadastro-container">
      <h2>Cadastro</h2>
      <form @submit.prevent="handleCadastro">
        <div class="input-group">
          <label for="nome">Nome</label>
          <input type="text" v-model="name" placeholder="Seu Nome" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" placeholder="exemplo@gmail.com" required />
        </div>
        <div class="input-group">
          <label for="senha">Senha</label>
          <input type="password" v-model="password" placeholder="********" required />
        </div>
        <button type="submit" class="btn">Cadastrar</button>
      </form>
      <p>Já possui uma conta? <router-link to="/login">Faça login</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      handleCadastro() {
        console.log('Cadastro com:', this.name, this.email, this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para a página de cadastro */
  </style>
  